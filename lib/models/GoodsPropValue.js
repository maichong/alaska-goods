'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsProp = require('./GoodsProp');

var _GoodsProp2 = _interopRequireDefault(_GoodsProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

class GoodsPropValue extends service.Model {

  preSave() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.createdAt) {
        _this.createdAt = new Date();
      }
      let count = yield GoodsPropValue.count({
        prop: _this.prop,
        title: _this.title
      }).where('_id').ne(_this._id);
      if (count) {
        throw new Error('Reduplicate prop value title');
      }
    })();
  }

  postSave() {
    this.processProp();
  }

  postRemove() {
    this.processProp();
  }

  /**
   * [async] 整理相应属性的属性值
   */
  processProp() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let prop = yield _GoodsProp2.default.findById(_this2.prop);
      if (!prop) {
        return;
      }
      let values = yield GoodsPropValue.find({
        prop: prop._id
      });
      prop.values = values.map(function (v) {
        return v._id;
      });
      yield prop.save();
    })();
  }

}
exports.default = GoodsPropValue;
GoodsPropValue.label = 'Property Values';
GoodsPropValue.defaultColumns = 'title,prop,sort,createdAt';
GoodsPropValue.defaultSort = '-sort -createdAt';
GoodsPropValue.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  prop: {
    label: 'Goods Property',
    type: _GoodsProp2.default,
    index: true,
    require: true
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