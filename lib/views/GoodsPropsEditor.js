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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alaskaAdminView = require('alaska-admin-view');

var _Select = require('alaska-field-select/lib/Select');

var _Select2 = _interopRequireDefault(_Select);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

var GoodsPropsEditor = function (_React$Component) {
  (0, _inherits3.default)(GoodsPropsEditor, _React$Component);

  function GoodsPropsEditor(props, context) {
    (0, _classCallCheck3.default)(this, GoodsPropsEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GoodsPropsEditor).call(this, props));

    _this.fetchProps = function () {
      var cat = _this.props.data.cat;
      if (_this._cat == cat) {
        return;
      }
      _this._cat = cat;
      _alaskaAdminView.api.get(_this.state.service.prefix + '/api/goods-prop?cat=' + cat).then(function (res) {
        var map = {};
        _lodash2.default.each(res.results, function (prop) {
          map[prop.id] = prop;
          prop.options = _lodash2.default.map(prop.values, function (v) {
            return { label: v.title, value: v.id };
          });
        });
        _this.setState({
          goodsProps: res.results,
          goodsPropsMap: map
        }, _this.update);
      });
    };

    _this.onChange = function () {
      var goodsProps = _this.state.goodsProps;
      var valueMap = _this.state.valueMap;
      var values = [];
      _lodash2.default.each(goodsProps, function (p) {
        var prop = valueMap[p.id];
        if (prop && prop.values.length) {
          values.push(prop);
        }
      });
      _this.props.onChange(values);
    };

    var service = context.settings.services['alaska-goods'];
    //let model = service.models.GoodsProps;
    _this.state = {
      service: service,
      goodsProps: [],
      goodsPropsMap: {},
      valueMap: _this.arrayToMap(props.value)
    };
    return _this;
  }

  (0, _createClass3.default)(GoodsPropsEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.fetchProps();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var newState = {};
      if (props.value) {
        newState.valueMap = this.arrayToMap(props.value);
        this.setState(newState);
      }
    }
  }, {
    key: 'arrayToMap',
    value: function arrayToMap(array) {
      var map = {};
      _lodash2.default.each(array, function (v) {
        map[v.id] = v;
      });
      return map;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var data = props.data;
      if (!data.cat) {
        return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          '请先选择商品分类'
        );
      }
      var goodsProps = this.state.goodsProps;
      if (!goodsProps || !goodsProps.length) {
        return _react2.default.createElement(
          'div',
          { className: 'text-center' },
          'Loading...'
        );
      }

      var valueMap = this.state.valueMap;
      var me = this;

      var list = [];
      goodsProps.forEach(function (p, index) {
        if (!valueMap[p.id]) {
          valueMap[p.id] = {
            id: p.id,
            title: p.title,
            sku: p.sku,
            values: []
          };
        }

        function handleChange(value) {
          if (p.multi) {
            valueMap[p.id].values = value;
          } else {
            valueMap[p.id].values = value ? [value] : [];
          }
          me.setState({ valueMap: valueMap }, me.onChange);
        }

        var value = valueMap[p.id].values;

        if (!p.multi) {
          value = value.length ? value[0] : '';
        }

        list.push(_react2.default.createElement(
          'div',
          { className: 'form-group', key: index },
          _react2.default.createElement(
            'label',
            { className: 'control-label col-xs-2' },
            p.title
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-10' },
            _react2.default.createElement(_Select2.default, {
              value: value,
              multi: p.multi,
              options: p.options,
              allowCreate: p.input,
              onChange: handleChange
            })
          )
        ));
      });

      return _react2.default.createElement(
        'div',
        null,
        list
      );
    }
  }]);
  return GoodsPropsEditor;
}(_react2.default.Component);

GoodsPropsEditor.propTypes = {
  children: _react2.default.PropTypes.node
};
GoodsPropsEditor.contextTypes = {
  settings: _react2.default.PropTypes.object
};
exports.default = GoodsPropsEditor;