/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

import GoodsCat from './GoodsCat';
import _ from 'lodash';

/**
 * @class GoodsProp
 * @extends Model
 */
export default class GoodsProp extends service.Model {

  static label = '商品属性';
  static defaultColumns = 'title,required,multi,sku,filter,input,activated,sort,createdAt';
  static defaultSort = '-sort';
  static searchFields = 'title';
  static populations = [{
    path: 'values',
    select: 'title'
  }];

  static api = {
    list: 1
  };

  static relationships = [{
    ref: 'GoodsPropValue',
    path: 'prop'
  }];

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    cats: {
      label: '所属分类',
      type: [GoodsCat],
      private: true
    },
    catsIndex: {
      label: '所属分类索引',
      type: [GoodsCat],
      index: true,
      hidden: true,
      private: true
    },
    required: {
      label: '必选',
      type: Boolean
    },
    multi: {
      label: '多选',
      type: Boolean
    },
    sku: {
      label: 'SKU',
      type: Boolean
    },
    filter: {
      label: '检索',
      type: Boolean
    },
    input: {
      label: '可输入',
      type: Boolean
    },
    sort: {
      label: '排序',
      type: Number,
      default: 0,
      private: true
    },
    help: {
      label: '帮助',
      type: String,
      help: '此帮助信息显示在商品编辑页面'
    },
    values: {
      label: '可选值',
      type: ['GoodsPropValue'],
      hidden: true
    },
    activated: {
      label: '激活',
      type: Boolean,
      private: true
    },
    createdAt: {
      label: '添加时间',
      type: Date,
      private: true
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

  async updateCatsIndex() {
    if (this.cats.length) {
      let cats = {};
      for (let i in this.cats) {
        let cid = this.cats[i];
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
