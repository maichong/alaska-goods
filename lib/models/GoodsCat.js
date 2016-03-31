'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

class GoodsCat extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
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
  subs() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (_this.populated('subCats')) {
        return _this.subCats;
      }
      return yield GoodsCat.find({ parent: _this._id });
    })();
  }

  /**
   * 获取当前分类的所有子分类对象列表
   * @returns {[GoodsCat]}
   */
  allSubs() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let list = yield _this2.subs();
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
GoodsCat.label = 'Goods Category';
GoodsCat.defaultColumns = 'title,parent,sort,createdAt';
GoodsCat.defaultSort = '-sort';
GoodsCat.searchFields = 'title';
GoodsCat.api = {
  list: 1
};
GoodsCat.relationships = [{
  ref: 'GoodsCat',
  path: 'parent',
  title: 'Sub Categories'
}];
GoodsCat.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  parent: {
    label: 'Parent Category',
    type: 'relationship',
    ref: 'GoodsCat',
    index: true
  },
  subCats: {
    label: 'Sub Categories',
    type: 'relationship',
    ref: 'GoodsCat',
    multi: true,
    hidden: true,
    private: true
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