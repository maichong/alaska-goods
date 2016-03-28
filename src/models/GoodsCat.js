/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;
import _ from 'lodash';

export default class GoodsCat extends service.Model {

  static label = '商品分类';
  static defaultColumns = 'title,parent,sort,createdAt';
  static defaultSort = '-sort';
  static api = {
    list: 1
  };

  static relationships = [{
    ref: 'GoodsCat',
    path: 'parent',
    title: '子分类'
  }];

  static fields = {
    title: {
      label: '标题',
      type: String,
      require: true
    },
    parent: {
      label: '父分类',
      type: 'relationship',
      ref: 'GoodsCat',
      index: true
    },
    subCats: {
      label: '子分类',
      type: 'relationship',
      ref: 'GoodsCat',
      multi: true,
      hidden: true,
      private: true
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
    if (this.parent) {
      service.run('UpdateCatRef', { cat: this.parent });
    }
    service.run('UpdatePropRef', { cat: this.id });
  }

  postRemove() {
    if (this.parent) {
      service.run('UpdateCatRef', { cat: this.parent });
    }
    service.run('UpdatePropRef', { cat: this.id });
  }

  /**
   * 获取当前分类的子分类对象列表
   * @returns {[GoodsCat]}
   */
  async subs() {
    if (this.populated('subCats')) {
      return this.subCats;
    }
    return await GoodsCat.find({ parent: this._id });
  }

  /**
   * 获取当前分类的所有子分类对象列表
   * @returns {[GoodsCat]}
   */
  async allSubs() {
    let list = await this.subs();
    if (!list.length) {
      return {};
    }

    let subs = {};
    for (let i in list) {
      let sub = list[i];
      if (subs[sub.id]) {
        continue;
      }
      subs[sub.id] = sub;
      let subsubs = await sub.allSubs();
      _.defaults(subs, subsubs);
    }
    return subs;
  }
}
