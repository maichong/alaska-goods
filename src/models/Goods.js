/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import GoodsCat from './GoodsCat';
import GoodsProp from './GoodsProp';
import GoodsPropValue from './GoodsPropValue';
import Sku from './Sku';

export default class Goods extends service.Model {

  static label = '商品';
  static defaultColumns = 'title,createdAt';
  static defaultSort = '-sort';

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    pic: {
      label: '主图',
      type: 'image',
      require: true
    },
    pics: {
      label: '附图',
      type: 'images'
    },
    cat: {
      label: '分类',
      type: GoodsCat
    },
    cats: {
      label: '分类列表',
      type: [GoodsCat],
      hidden: true
    },
    currency: {
      label: '货币',
      type: 'relationship',
      ref: 'Currency'
    },
    price: {
      label: '价格',
      type: Number,
      default: 0
    },
    discount: {
      label: '折扣价',
      type: Number,
      default: 0,
      note: '为0则表示不打折'
    },
    discountEndAt: {
      label: '折扣截止时间',
      type: Date
    },
    inventory: {
      label: '库存',
      type: Number,
      default: 0
    },
    volume: {
      label: '销量',
      type: Number,
      default: 0
    },
    skus: {
      label: 'SKU',
      type: [Sku]
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
      type: [GoodsProp]
    },
    propValues: {
      label: '属性值',
      type: [GoodsPropValue]
    },
    createdAt: {
      label: '添加时间',
      type: Date
    },
    desc: {
      label: '详情',
      type: 'html'
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
