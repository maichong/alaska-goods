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
Sku.defaultColumns = 'pic,goods,desc,inventory,price,valid';
Sku.defaultSort = '-sort';
Sku.noedit = true;
Sku.noremove = true;
Sku.nocreate = true;
Sku.title = 'desc';
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
  key: {
    label: 'KEY',
    type: String
  },
  desc: {
    label: '描述',
    type: String
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
    help: '为0则表示不打折'
  },
  inventory: {
    label: '库存',
    type: Number,
    default: 0
  },
  volume: {
    label: '销量',
    type: Number,
    default: 0,
    private: true
  },
  valid: {
    label: '有效',
    type: Boolean,
    private: true
  },
  props: {
    label: '属性',
    type: Object
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};