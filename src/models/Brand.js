/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-26
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Brand extends alaska.Model {

  static label = 'Brand';
  static icon = 'diamond';
  static title = 'title';
  static defaultColumns = 'logo title sort createdAt';
  static defaultSort = '-sort';

  static api = {
    list: 1,
    show: 1
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    logo: {
      label: 'Logo',
      type: 'image'
    },
    initial: {
      label: 'Initial',
      type: String,
      index: true
    },
    sort: {
      label: 'Sort',
      type: Number,
      default: 0
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    desc: {
      label: 'Description',
      type: 'html',
      default: ''
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
