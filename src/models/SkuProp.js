/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import GoodsCat from './GoodsCat';

export default class SkuProp extends service.Model {

  static label = 'SkuProp';
  static title = 'name';
  static defaultColumns = 'name';
  static defaultSort = '-sort';

  static fields = {
    name: {
      label: '名称',
      type: String,
      require: true
    },
    cat: {
      label: '所属分类',
      type: GoodsCat
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
