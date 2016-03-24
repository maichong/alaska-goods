'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

require('../../goods.less');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param value
 * @param props
 * @returns {[]}
 */
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

function updateValue(value, goodsProps, goodsPropsMap) {
  value = value || [];
  var skuProps = [];
  goodsProps.forEach(function (prop) {
    if (prop.sku) {
      skuProps.push(prop);
    }
  });
  if (!skuProps.length) {
    return value;
  }

  function create(index, req) {
    var res = [];
    var prop = skuProps[index];
    if (!index) {
      _lodash2.default.forEach(prop.values, function (v) {
        res.push({
          props: (0, _defineProperty3.default)({}, prop.id, v.value)
        });
      });
    } else {
      _lodash2.default.forEach(req, function (p) {
        _lodash2.default.forEach(prop.values, function (v) {
          var props = _lodash2.default.assign({}, p.props, (0, _defineProperty3.default)({}, prop.id, v.value));
          res.push({ props: props });
        });
      });
    }

    index++;

    if (index < skuProps.length) {
      return create(index, res);
    }
    return res;
  }

  var skuMap = _lodash2.default.reduce(create(0, {}), function (res, s) {
    var sortedKeys = (0, _keys2.default)(s.props).sort();
    //56f124ad50443e202b820a0d:散装|56f12e1d50443e202b820a11:56f12e3b50443e202b820a12
    s.key = sortedKeys.map(function (id) {
      return id + ':' + s.props[id];
    }).join('|');
    //规格:散装|套餐:官方套餐
    s.desc = sortedKeys.map(function (id) {
      return goodsPropsMap[id].title + ':' + goodsPropsMap[id].valueMap[s.props[id]].label;
    }).join('|');
    s.valid = true;
    res[s.key] = s;
    return res;
  }, {});
  value.forEach(function (v) {
    if (!v.key) {
      return;
    }
    if (skuMap[v.key]) {
      //如果sku记录在允许中
      v.valid = true;
      skuMap[v.key] = v;
    } else if (v.price && v.inventory) {
      //如果sku不在允许中,并且sku已经设置了价格和库存
      v.valid = false;
      var s = _lodash2.default.find(skuMap, function (s) {
        if (s.id || s.price || s.inventory) {
          return false;
        }
        for (var k in v.props) {
          if (s.props[k] != v.props[k]) {
            return false;
          }
        }
        return true;
      });
      if (s) {
        s.id = v.id;
        s.price = v.price;
        s.discount = v.discount;
        s.inventory = v.inventory;
        s.volume = v.volume;
      } else {
        skuMap[v.key] = v;
      }
    } //else 没有在允许的sku列表中,同时本sku记录无效,直接抛弃
  });
  return _lodash2.default.values(skuMap);
}

function createPropsMap(props) {
  var map = {};
  props.forEach(function (p) {
    var item = _lodash2.default.assign({}, p);
    item.valueMap = {};
    p.values.forEach(function (v) {
      item.valueMap[v.value] = v;
    });
    map[item.id] = item;
  });
  return map;
}

var GoodsSkuEditor = function (_React$Component) {
  (0, _inherits3.default)(GoodsSkuEditor, _React$Component);

  function GoodsSkuEditor(props) {
    (0, _classCallCheck3.default)(this, GoodsSkuEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GoodsSkuEditor).call(this, props));

    _this.state = {
      goodsProps: props.data.props,
      goodsPropsMap: createPropsMap(props.data.props)
    };
    _this.state.value = updateValue(props.value, _this.state.goodsProps, _this.state.goodsPropsMap);
    _this._trCache = {};
    return _this;
  }

  (0, _createClass3.default)(GoodsSkuEditor, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var newState = {};
      if (props.value !== undefined) {
        newState.value = props.value;
      }
      if (props.data && props.data.props != this.state.goodsProps) {
        newState.goodsProps = props.data.props;
        newState.goodsPropsMap = createPropsMap(props.data.props);
        newState.value = updateValue(props.value || this.state.value, newState.goodsProps, newState.goodsPropsMap);
        this._trCache = {};
      }
      this.setState(newState);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(props, state) {
      return state.value != this.state.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      //let { value } = this.props;
      var value = this.state.value;

      var trs = [];
      var me = this;
      var trCache = me._trCache;

      value.forEach(function (s, index) {
        if (trCache[s.key]) {
          trs.push(trCache[s.key]);
          return;
        }
        function onChangeInventory(e) {
          s.inventory = parseInt(e.target.value);
          delete trCache[s.key];
          me.props.onChange(value.slice());
        }

        function onChangePrice(e) {
          s.price = parseFloat(e.target.value);
          delete trCache[s.key];
          me.props.onChange(value.slice());
        }

        function onChangeDiscount(e) {
          s.discount = parseFloat(e.target.value);
          delete trCache[s.key];
          me.props.onChange(value.slice());
        }

        var className = !s.price || !s.inventory ? 'warning' : '';
        var disabled = false;
        var remove = void 0;
        if (!s.valid) {
          className = 'danger';
          disabled = 'disabled';
          remove = function remove() {
            delete trCache[s.key];
            me.props.onChange(_lodash2.default.without(value, s));
          };
        }
        var pic = s.pic || _this2.props.data.pic;
        trCache[s.key] = _react2.default.createElement(
          'tr',
          { key: index, className: className },
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('img', { src: pic.thumbUrl })
          ),
          _react2.default.createElement('td', { className: 'desc', dangerouslySetInnerHTML: { __html: s.desc.replace(/\|/g, '<br/>') } }),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'number', disabled: disabled, value: s.inventory, onChange: onChangeInventory })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'number', disabled: disabled, value: s.price, onChange: onChangePrice })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'number', disabled: disabled, value: s.discount, onChange: onChangeDiscount })
          ),
          _react2.default.createElement(
            'td',
            { className: 'text-center text-danger' },
            _react2.default.createElement('i', { className: 'fa fa-close', onClick: remove })
          )
        );
        trs.push(trCache[s.key]);
      });
      return _react2.default.createElement(
        _reactBootstrap.Panel,
        { header: 'SKU' },
        _react2.default.createElement(
          _reactBootstrap.Table,
          { fill: true, className: 'goods-sku-editor' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'th',
                null,
                '图片'
              ),
              _react2.default.createElement(
                'th',
                null,
                '属性'
              ),
              _react2.default.createElement(
                'th',
                null,
                '库存'
              ),
              _react2.default.createElement(
                'th',
                null,
                '价格'
              ),
              _react2.default.createElement(
                'th',
                null,
                '折扣价'
              ),
              _react2.default.createElement('th', null)
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            trs
          )
        )
      );
    }
  }]);
  return GoodsSkuEditor;
}(_react2.default.Component);

GoodsSkuEditor.propTypes = {
  data: _react2.default.PropTypes.object
};
exports.default = GoodsSkuEditor;