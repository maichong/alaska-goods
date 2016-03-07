/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import GoodsPropValue from './GoodsPropValue';

export default class GoodsProp extends service.Model {

  static label = '商品属性';
  static defaultColumns = '';
  static defaultSort = '-sort';

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    sort: {
      label: '排序',
      type: Number,
      default: 0
    },
    values: {
      label: '可选值',
      type: [GoodsPropValue]
    },
    createdAt: {
      label: '添加时间',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
