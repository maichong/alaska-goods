'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('./GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/**
 * @class GoodsProp
 * @extends Model
 */
class GoodsProp extends service.Model {

  preSave() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.createdAt) {
        _this.createdAt = new Date();
      }
      if (_this.isNew || _this.isModified('cats')) {
        yield _this.updateCatsIndex();
      }
    })();
  }

  preRemove() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      const GoodsPropValue = service.model('GoodsPropValue');
      if (yield GoodsPropValue.count({ prop: _this2._id })) {
        throw new Error('Can not remove this goods prop, please remove the values first!');
      }
    })();
  }

  /**
   * 更新本属性所对应分类的关联索引
   */
  updateCatsIndex() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.cats.length) {
        let cats = {};
        for (let i in _this3.cats) {
          let cid = _this3.cats[i];
          if (cats[cid]) {
            continue;
          }
          let cat = yield _GoodsCat2.default.findCache(cid);
          cats[cid] = cat;
          let subs = yield cat.allSubs();
          _lodash2.default.defaults(cats, subs);
        }
        _this3.catsIndex = Object.keys(cats);
      } else {
        _this3.catsIndex = [];
      }
    })();
  }
}
exports.default = GoodsProp;
GoodsProp.label = 'Goods Properties';
GoodsProp.defaultColumns = 'title,required,multi,sku,filter,input,activated,sort,createdAt';
GoodsProp.defaultSort = '-sort';
GoodsProp.searchFields = 'title';
GoodsProp.populations = [{
  path: 'values',
  select: 'title'
}];
GoodsProp.api = {
  list: 1
};
GoodsProp.relationships = [{
  ref: 'GoodsPropValue',
  path: 'prop'
}];
GoodsProp.groups = {
  editor: {
    title: 'Create Property Values'
  }
};
GoodsProp.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  cats: {
    label: 'Categories',
    type: [_GoodsCat2.default],
    private: true
  },
  catsIndex: {
    label: 'Categories Index',
    type: [_GoodsCat2.default],
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
    depends: '_id'
  }
};