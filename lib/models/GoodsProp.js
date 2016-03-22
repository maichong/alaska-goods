'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('./GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

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

class GoodsProp extends service.Model {

  preSave() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.createdAt) {
        _this.createdAt = new Date();
      }
      _this.catsIndex = [];
      if (_this.cats.length) {
        let cats = {};
        for (let i in _this.cats) {
          let cid = _this.cats[i];
          if (cats[cid]) {
            continue;
          }
          let cat = yield _GoodsCat2.default.findCache(cid);
          cats[cid] = cat;
          let subs = yield cat.allSubs();
          _lodash2.default.defaults(cats, subs);
        }
        _this.catsIndex = Object.keys(cats);
      }
    })();
  }
}
exports.default = GoodsProp;
GoodsProp.label = '商品属性';
GoodsProp.defaultColumns = 'title,required,multi,sku,filter,input,activated,sort,createdAt';
GoodsProp.defaultSort = '-sort';
GoodsProp.searchFields = 'title';
GoodsProp.population = [{
  path: 'values',
  select: 'title'
}];
GoodsProp.api = {
  list: 1
};
GoodsProp.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  cats: {
    label: '所属分类',
    type: [_GoodsCat2.default],
    private: true
  },
  catsIndex: {
    label: '所属分类索引',
    type: [_GoodsCat2.default],
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