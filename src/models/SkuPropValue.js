/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import SkuProp from './SkuProp';

export default class SkuPropValue extends service.Model {

  static label = 'SkuPropValue';
  static title = 'name';
  static defaultColumns = 'name';
  static defaultSort = '-sort';

  static fields = {
    name: {
      label: '名称',
      type: String,
      require: true
    },
    prop: {
      label: '属性',
      type: SkuProp
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

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
