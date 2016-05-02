/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-28
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';

const BALANCE = alaska.service('alaska-balance');
const currenciesMap = BALANCE.currenciesMap;
const GOODS = alaska.service('alaska-goods');
const Goods = GOODS.model('Goods');
const Sku = GOODS.model('Sku');
const Order = service.model('Order');
const OrderItem = service.model('OrderItem');

export async function pre() {
  let data = this.data;
  //goods ids
  let gids = data.goods;
  if (!gids || !gids.length) {
    return;
  }
  let orders = data.orders = data.orders || [];
  const pre = data.pre;
  let orderItems = [];
  for (let g of gids) {
    if (!g.id) continue;
    let goods = await Goods.findById(g.id);
    if (!goods) continue;
    if (!goods.activated) service.error('Goods is not activated');
    let discountValid = goods.discountValid;
    let item = new OrderItem({
      pic: goods.pic,
      goods: goods._id,
      title: goods.title,
      currency: goods.currency,
      price: goods.price,
      shipping: goods.shipping || 0,
      discount: discountValid ? goods.discount : 0,
      quantity: parseInt(g.quantity) || 1
    });
    let sku;
    //如果选择了SKU
    if (g.sku) {
      sku = await Sku.findById(g.sku).where('goods', goods._id);
      if (!sku || !sku.inventory) service.error('Goods have been sold out');
      item.price = sku.price;
      item.discount = discountValid ? sku.discount : 0;
      if (sku.pic) {
        item.pic = sku.pic;
      }
    }
    //如果没有选择SKU,但是商品却又有SKU设置
    else if (goods.skus && goods.skus.length) service.error('Please select goods props');
    //没有库存
    else if (!goods.inventory) service.error('Goods have been sold out');
    else {
      //没有指定SKU的商品
    }
    let currency = currenciesMap[goods.currency] || BALANCE.defaultCurrency;
    let precision = currency.precision || 0;

    item.total = _.round(item.quantity * (item.discount || item.price), precision);
    orderItems.push(item);
  }

  orderItems.forEach(item => {
    let order = _.find(orders, o => o.type === 'goods' && o.canAppendItem(item));
    if (order) {
      item.order = order._id;
    } else {
      order = new Order({
        title: item.title,
        type: 'goods',
        pic: item.pic,
        user: data.user._id,
        currency: item.currency
      });
      order.address = data.address;
      order.items = [item];
      orders.push(order);
    }
  });

  //计算订单价格
  orders.forEach(order => {
    if (order.type !== 'goods') return;
    let shipping = 0;
    let total = 0;
    order.items.forEach(item => {
      if (item.shipping) {
        shipping += item.shipping;
      }
      total += item.total || 0;
    });
    order.shipping = shipping;
    order.total = total;
    order.pay = shipping + total;
  });
}
