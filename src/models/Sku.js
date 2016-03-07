/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

export default class Sku extends service.Model {

  static label = 'Sku';
  static defaultColumns = 'title,goods';
  static defaultSort = '-sort';

  static fields = {
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

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
