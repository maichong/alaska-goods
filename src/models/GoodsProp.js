/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

import _ from 'lodash';
import alaska from 'alaska';
import service from '../';
import GoodsCat from './GoodsCat';

/**
 * @class GoodsProp
 * @extends Model
 */
export default class GoodsProp extends alaska.Model {

  static label = 'Goods Properties';
  static icon = 'th';
  static defaultColumns = 'title required multi sku filter input activated sort createdAt';
  static defaultSort = '-sort';
  static searchFields = 'title';

  static api = {
    list: 1
  };

  static populations = {
    values: {
      select: 'title'
    }
  };

  static relationships = {
    values: {
      ref: 'GoodsPropValue',
      path: 'prop'
    }
  };

  static groups = {
    editor: {
      title: 'Create Property Values'
    }
  };

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    cats: {
      label: 'Categories',
      type: ['GoodsCat'],
      private: true
    },
    catsIndex: {
      label: 'Categories',
      type: [GoodsCat],
      index: true,
      hidden: true,
      private: true
    },
    required: {
      label: 'Required',
      type: Boolean
    },
    multi: {
      label: 'Multi',
      type: Boolean
    },
    sku: {
      label: 'SKU',
      type: Boolean
    },
    filter: {
      label: 'Filter',
      type: Boolean
    },
    input: {
      label: 'Input',
      type: Boolean
    },
    sort: {
      label: 'Sort',
      type: Number,
      default: 0,
      private: true
    },
    help: {
      label: 'Help',
      type: String,
      help: 'This message will display in the goods editor.'
    },
    values: {
      label: 'Values',
      type: ['GoodsPropValue'],
      hidden: true
    },
    activated: {
      label: 'Activated',
      type: Boolean,
      private: true
    },
    createdAt: {
      label: 'Created At',
      type: Date,
      private: true
    },
    valueEditor: {
      type: String,
      view: 'GoodsPropsValueEditor',
      private: true,
      group: 'editor',
      depends: '_id',
      filter: false,
      cell: false
    }
  };

  async preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    if (this.isNew || this.isModified('cats')) {
      await this.updateCatsIndex();
    }
  }

  async preRemove() {
    const GoodsPropValue = service.model('GoodsPropValue');
    if (await GoodsPropValue.count({ prop: this._id })) {
      throw new Error('Can not remove this goods prop, please remove the values first!');
    }
  }

  /**
   * 更新本属性所对应分类的关联索引
   */
  async updateCatsIndex() {
    if (this.cats.length) {
      let cats = {};
      for (let cid of this.cats) {
        if (cats[cid]) {
          continue;
        }
        let cat = await GoodsCat.findCache(cid);
        cats[cid] = cat;
        let subs = await cat.allSubs();
        _.defaults(cats, subs);
      }
      this.catsIndex = Object.keys(cats);
    } else {
      this.catsIndex = [];
    }
  }
}
