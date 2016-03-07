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
  title: {
    label: '标题',
    type: String,
    require: true
  },
  goods: {
    type: 'relationship',
    ref: 'Goods'
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