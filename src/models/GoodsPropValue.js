/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

import GoodsProp from './GoodsProp';

export default class GoodsPropValue extends service.Model {

  static label = 'Property Values';
  static defaultColumns = 'title,prop,sort,createdAt';
  static defaultSort = '-sort -createdAt';

  static fields = {
    title: {
      label: 'Title',
      type: String,
      require: true
    },
    prop: {
      label: 'Goods Property',
      type: GoodsProp,
      index: true,
      require: true
    },
    sort: {
      label: 'Sort',
      type: Number,
      default: 0
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };

  async preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    let count = await GoodsPropValue.count({
      prop: this.prop,
      title: this.title
    }).where('_id').ne(this._id);
    if (count) {
      throw new Error('Reduplicate prop value title');
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
