'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;
class GoodsCat extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  postSave() {
    if (this.parent) {
      this.processParent();
    }
    this.updateProps();
  }

  postRemove() {
    if (this.parent) {
      this.processParent();
    }
    this.updateProps();
  }

  /**
   * [async] 更新商品属性索引关系
   */
  updateProps() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const GoodsProp = service.model('GoodsProp');
      let cats = [_this._id];
      let parent = _this.parent;
      while (parent) {
        let cat = yield GoodsCat.findCache(parent);
        if (cat) {
          cats.push(cat._id);
          parent = cat.parent;
        } else {
          parent = '';
        }
      }
      let props = yield GoodsProp.find().where('catsIndex').in(cats);
      for (let prop of props) {
        yield prop.updateCatsIndex();
        prop.save();
      }
    })();
  }

  /**
   * [async] 整理此分类的父分类关联关系
   */
  processParent() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let parent = yield GoodsCat.findById(_this2.parent);
      if (!parent) {
        return;
      }
      let subs = yield GoodsCat.find({
        parent: parent._id
      });
      parent.subCats = subs.map(function (cat) {
        return cat._id;
      });
      yield parent.save();
    })();
  }

  /**
   * 获取当前分类的子分类对象列表
   * @returns {[GoodsCat]}
   */
  subs() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.populated('subCats')) {
        return _this3.subCats;
      }
      return yield GoodsCat.find({ parent: _this3._id });
    })();
  }

  /**
   * 获取当前分类的所有子分类对象列表
   * @returns {[GoodsCat]}
   */
  allSubs() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let list = yield _this4.subs();
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
        let subsubs = yield sub.allSubs();
        _lodash2.default.defaults(subs, subsubs);
      }
      return subs;
    })();
  }
}
exports.default = GoodsCat;
GoodsCat.label = '商品分类';
GoodsCat.defaultColumns = 'title,parent,sort,createdAt';
GoodsCat.defaultSort = '-sort';
GoodsCat.api = {
  list: 1
};
GoodsCat.fields = {
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