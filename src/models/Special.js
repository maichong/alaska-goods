/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-09-29
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Special extends alaska.Model {

  static label = 'Special';
  static icon = 'hashtag';
  static title = 'title';
  static defaultColumns = 'pic title sort createdAt';
  static defaultSort = '-createdAt';

  static api = {
    list: 1,
    show: 1
  };

  static scopes = {
    list: 'title pic createdAt'
  };

  static groups = {
    desc: {
      title: 'Description',
      className: 'noborder'
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    pic: {
      label: 'Picture',
      type: 'image'
    },
    seoTitle: {
      label: 'SEO Title',
      type: String,
      default: ''
    },
    seoKeywords: {
      label: 'SEO Keywords',
      type: String,
      default: ''
    },
    seoDescription: {
      label: 'SEO Description',
      type: String,
      default: ''
    },
    goods: {
      label: 'Goods List',
      type: ['Goods']
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    desc: {
      label: 'Description',
      type: 'html',
      default: '',
      group: 'desc',
      horizontal: false,
      nolabel: true
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
