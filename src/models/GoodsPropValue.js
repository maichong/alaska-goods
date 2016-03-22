/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import GoodsProp from './GoodsProp';

export default class GoodsPropValue extends service.Model {

  static label = '商品属性值';
  static defaultColumns = 'title,prop,sort,createdAt';
  static defaultSort = '-sort';

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    prop: {
      label: '属性',
      type: GoodsProp,
      require: true
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

  postSave() {
    this.processProp();
  }

  postRemove() {
    this.processProp();
  }

  /**
   * [async] 整理相应属性的属性值
   */
  async processProp() {
    let prop = await GoodsProp.findById(this.prop);
    if (!prop) {
      return;
    }
    let values = await GoodsPropValue.find({
      prop: prop._id
    });
    prop.values = values.map(v => v._id);
    await prop.save();
  }

}
