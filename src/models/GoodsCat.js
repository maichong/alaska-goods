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
      this.processParent();
    }
  }

  postRemove() {
    if (this.parent) {
      this.processParent();
    }
  }

  /**
   * [async] 整理此分类的父分类关联关系
   */
  async processParent() {
    let parent = await GoodsCat.findById(this.parent);
    if (!parent) {
      return;
    }
    let subs = await GoodsCat.find({
      parent: parent._id
    });
    parent.subCats = subs.map(cat => cat._id);
    await parent.save();
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
