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

class GoodsCat extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = GoodsCat;
GoodsCat.label = '商品分类';
GoodsCat.defaultColumns = '';
GoodsCat.defaultSort = '-sort';
GoodsCat.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  parent: {
    label: '父分类',
    type: 'relationship',
    ref: 'GoodsCat'
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