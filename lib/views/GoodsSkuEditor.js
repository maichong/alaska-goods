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

var _reactBootstrap = require('react-bootstrap');

require('../../goods.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoodsSkuEditor = function (_React$Component) {
  (0, _inherits3.default)(GoodsSkuEditor, _React$Component);

  function GoodsSkuEditor(props) {
    (0, _classCallCheck3.default)(this, GoodsSkuEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GoodsSkuEditor).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(GoodsSkuEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      var styles = {
        root: {}
      };
      return _react2.default.createElement(
        _reactBootstrap.Panel,
        { header: 'SKU' },
        _react2.default.createElement(
          _reactBootstrap.Table,
          { fill: true, className: 'goods-sku-editor' },
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
            _react2.default.createElement(
              'th',
              null,
              '销量'
            ),
            _react2.default.createElement(
              'th',
              null,
              '激活'
            ),
            _react2.default.createElement('th', null)
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              'a'
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement('input', { type: 'number' })
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement('input', { type: 'number' })
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement('input', { type: 'number' })
            ),
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement('input', { type: 'number' })
            ),
            _react2.default.createElement('td', null),
            _react2.default.createElement('td', null)
          )
        )
      );
    }
  }]);
  return GoodsSkuEditor;
}(_react2.default.Component); /**
                               * @copyright Maichong Software Ltd. 2016 http://maichong.it
                               * @date 2016-03-22
                               * @author Liang <liang@maichong.it>
                               */

GoodsSkuEditor.propTypes = {
  children: _react2.default.PropTypes.node
};
exports.default = GoodsSkuEditor;