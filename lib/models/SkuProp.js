'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('./GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class SkuProp extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = SkuProp;
SkuProp.label = 'SkuProp';
SkuProp.title = 'name';
SkuProp.defaultColumns = 'name';
SkuProp.defaultSort = '-sort';
SkuProp.fields = {
  name: {
    label: '名称',
    type: String,
    require: true
  },
  cat: {
    label: '所属分类',
    type: _GoodsCat2.default
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