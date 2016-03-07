'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('./GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

var _GoodsProp = require('./GoodsProp');

var _GoodsProp2 = _interopRequireDefault(_GoodsProp);

var _GoodsPropValue = require('./GoodsPropValue');

var _GoodsPropValue2 = _interopRequireDefault(_GoodsPropValue);

var _Sku = require('./Sku');

var _Sku2 = _interopRequireDefault(_Sku);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

const service = __service;

class Goods extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = Goods;
Goods.label = '商品';
Goods.defaultColumns = 'title,createdAt';
Goods.defaultSort = '-sort';
Goods.fields = {
  title: {
    label: '标题',
    type: String,
    require: true
  },
  pic: {
    label: '主图',
    type: 'image',
    require: true
  },
  pics: {
    label: '附图',
    type: 'images'
  },
  cat: {
    label: '分类',
    type: _GoodsCat2.default
  },
  cats: {
    label: '分类列表',
    type: [_GoodsCat2.default],
    hidden: true
  },
  currency: {
    label: '货币',
    type: 'relationship',
    ref: 'Currency'
  },
  price: {
    label: '价格',
    type: Number,
    default: 0
  },
  discount: {
    label: '折扣价',
    type: Number,
    default: 0,
    note: '为0则表示不打折'
  },
  discountEndAt: {
    label: '折扣截止时间',
    type: Date
  },
  inventory: {
    label: '库存',
    type: Number,
    default: 0
  },
  volume: {
    label: '销量',
    type: Number,
    default: 0
  },
  skus: {
    label: 'SKU',
    type: [_Sku2.default]
  },
  sort: {
    label: '排序',
    type: Number,
    default: 0
  },
  activated: {
    label: '上架',
    type: Boolean
  },
  props: {
    label: '属性',
    type: [_GoodsProp2.default]
  },
  propValues: {
    label: '属性值',
    type: [_GoodsPropValue2.default]
  },
  createdAt: {
    label: '添加时间',
    type: Date
  },
  desc: {
    label: '详情',
    type: 'html'
  }
};