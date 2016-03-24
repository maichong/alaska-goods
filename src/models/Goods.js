/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;
const balanceService = service.service('balance');

import _ from 'lodash';
import Sku from './Sku';

export default class Goods extends service.Model {

  static label = '商品';
  static defaultColumns = 'pic,title,createdAt';
  static defaultSort = '-sort';
  static searchFields = 'title';
  static api = {
    list: 1,
    show: 1
  };
  static populations = [{
    path: 'skus',
    match: {
      inventory: { $gt: 0 },
      valid: true
    },
    nolist: true
  }];
  static groups = {
    price: '价格',
    inventory: '库存',
    props: '属性',
    sku: {
      title: 'SKU',
      panel: false
    },
    desc: '详情',
  };

  static fields = {
    title: {
      label: '标题',
      type: String,
      required: true
    },
    pic: {
      label: '主图',
      type: 'image',
      required: true
    },
    pics: {
      label: '附图',
      type: 'image',
      multi: true
    },
    cat: {
      label: '分类',
      ref: 'GoodsCat',
      index: true,
      required: true
    },
    cats: {
      label: '分类列表',
      type: ['GoodsCat'],
      hidden: true
    },
    currency: {
      label: '货币',
      type: 'select',
      options: balanceService.currencies,
      default: balanceService.defaultCurrency.value,
      group: 'price'
    },
    price: {
      label: '价格',
      type: Number,
      default: 0,
      format: '0.00',
      group: 'price'
    },
    discount: {
      label: '折扣价',
      type: Number,
      default: 0,
      format: '0.00',
      help: '为0则表示不打折',
      group: 'price'
    },
    discountEndAt: {
      label: '折扣截止时间',
      type: Date,
      group: 'price'
    },
    discountStartAt: {
      label: '折扣截止时间',
      type: Date,
      group: 'price'
    },
    inventory: {
      label: '库存',
      type: Number,
      default: 0,
      group: 'inventory'
    },
    volume: {
      label: '销量',
      type: Number,
      default: 0,
      group: 'inventory'
    },
    sort: {
      label: '排序',
      type: Number,
      default: 0
    },
    activated: {
      label: '上架',
      type: Boolean
    },
    props: {
      label: '属性',
      type: Object,
      view: 'GoodsPropsEditor',
      group: 'props'
    },
    propValues: {
      label: '属性值',
      type: ['GoodsPropValue'],
      hidden: true,
      private: true
    },
    skus: {
      label: 'SKU记录',
      type: ['Sku'],
      hidden: true
    },
    sku: {
      type: Object,
      view: 'GoodsSkuEditor',
      group: 'sku',
      private: true
    },
    createdAt: {
      label: '添加时间',
      type: Date
    },
    desc: {
      label: ' ',
      type: 'html',
      group: 'desc'
    }
  };

  async preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }

    //如果商品属性发生更改,重建属性值索引,供前端检索
    if (this.isModified('props')) {
      let propValues = [];
      _.each(this.props, prop => {
        if (prop.filter) {
          _.each(prop.values, value => {
            if (service.util.isMongoId(value.value)) {
              propValues.push(value.value);
            }
          });
        }
      });
      this.propValues = propValues;
    }

    //如果在后台修改了SKU,更新SKU记录
    if (this.isModified('sku')) {
      let skuIds = [];
      let skus = await Sku.find({
        goods: this.id
      });
      let skusMap = {};
      let skusMapByKey = {};
      skus.forEach(s => {
        skusMap[s.id] = s;
        skusMapByKey[s.key] = s;
      });
      for (let s of this.sku) {
        let sku;
        if (s.id) {
          sku = skusMap[s.id];
        }
        if (!sku) {
          sku = skusMapByKey[s.key];
        }
        if (!s.valid && !sku) {
          //没有找到,并且提交的是无效记录
          //跳过此条
          return;
        }
        if (s.valid && !sku) {
          sku = new Sku({
            goods: this.id
          });
        }
        sku.pic = s.pic;
        sku.valid = s.valid;
        sku.price = s.price;
        sku.discount = s.discount;
        sku.inventory = s.inventory;
        sku.desc = s.desc;
        sku.key = s.key;
        sku.props = s.props;
        sku.save();
        sku.__exist = true;
        skuIds.push(sku._id);
      }
      for (let sku of skus) {
        if (!sku.__exist) {
          sku.remove();
        }
      }
      this.skus = skuIds;
    }
  }
}
