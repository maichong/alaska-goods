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

var _qs = require('qs');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

var GoodsPropsValueEditor = function (_React$Component) {
  (0, _inherits3.default)(GoodsPropsValueEditor, _React$Component);

  function GoodsPropsValueEditor(props) {
    (0, _classCallCheck3.default)(this, GoodsPropsValueEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GoodsPropsValueEditor).call(this, props));

    _this.handleChange = function (event) {
      _this.setState({ display: event.target.value });
    };

    _this.handleSave = function () {
      _alaskaAdminView.api.post(_alaskaAdminView.PREFIX + '/api/save?' + (0, _qs.stringify)({
        service: 'alaska-goods',
        model: 'GoodsPropValue'
      }), {
        prop: _this.props.data._id,
        title: _this.state.display
      }).then(function (res) {
        location.reload();
      });
    };

    _this.state = {
      display: ''
    };
    return _this;
  }

  (0, _createClass3.default)(GoodsPropsValueEditor, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var state = this.state;
      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-6 col-md-offset-2' },
          _react2.default.createElement('input', { className: 'form-control', value: state.display, onChange: this.handleChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-md-2' },
          _react2.default.createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', onClick: this.handleSave, block: true },
            '保存'
          )
        )
      );
    }
  }]);
  return GoodsPropsValueEditor;
}(_react2.default.Component);

GoodsPropsValueEditor.propTypes = {};
exports.default = GoodsPropsValueEditor;