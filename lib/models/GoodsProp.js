'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsPropValue = require('./GoodsPropValue');

var _GoodsPropValue2 = _interopRequireDefault(_GoodsPropValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class GoodsProp extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = GoodsProp;
GoodsProp.label = '商品属性';
GoodsProp.defaultColumns = '';
GoodsProp.defaultSort = '-sort';
GoodsProp.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  sort: {
    label: '排序',
    type: Number,
    default: 0
  },
  values: {
    label: '可选值',
    type: [_GoodsPropValue2.default]
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};