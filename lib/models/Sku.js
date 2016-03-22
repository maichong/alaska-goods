'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class Sku extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = Sku;
Sku.label = 'Sku';
Sku.defaultColumns = 'title,goods';
Sku.defaultSort = '-sort';
Sku.fields = {
  pic: {
    label: '主图',
    type: 'image',
    require: true
  },
  goods: {
    type: 'relationship',
    ref: 'Goods',
    index: true
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
  activated: {
    label: '上架',
    type: Boolean
  },
  props: {
    label: '属性',
    type: ['GoodsProp']
  },
  propValues: {
    label: '属性值',
    type: ['GoodsPropValue']
  },
  sort: {
    label: '排序',
    type: Number,
    default: 0
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};