'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SkuProp = require('./SkuProp');

var _SkuProp2 = _interopRequireDefault(_SkuProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class SkuPropValue extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = SkuPropValue;
SkuPropValue.label = 'SkuPropValue';
SkuPropValue.title = 'name';
SkuPropValue.defaultColumns = 'name';
SkuPropValue.defaultSort = '-sort';
SkuPropValue.fields = {
  name: {
    label: '名称',
    type: String,
    require: true
  },
  prop: {
    label: '属性',
    type: _SkuProp2.default
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