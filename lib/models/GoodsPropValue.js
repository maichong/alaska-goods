'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsProp = require('./GoodsProp');

var _GoodsProp2 = _interopRequireDefault(_GoodsProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class GoodsPropValue extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = GoodsPropValue;
GoodsPropValue.label = '商品属性值';
GoodsPropValue.defaultColumns = 'title,prop,sort,createdAt';
GoodsPropValue.defaultSort = '-sort';
GoodsPropValue.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  prop: {
    label: '属性',
    type: _GoodsProp2.default,
    require: true
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