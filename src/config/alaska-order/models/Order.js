/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-02
 * @author Liang <liang@maichong.it>
 */

export default function (Order) {
  Order.fields.type.options.push({ label: 'Goods', type: 'goods' });
}
