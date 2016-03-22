/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-19
 * @author Liang <liang@maichong.it>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.views = undefined;

var _alaska = require('alaska');

var _alaska2 = _interopRequireDefault(_alaska);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const views = exports.views = {
  GoodsPropsEditor: __dirname + '/views/GoodsPropsEditor'
};

/**
 * @class GoodsService
 */
class GoodsService extends _alaska2.default.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-goods';
    options.dir = __dirname;
    super(options, alaska);
  }
}
exports.default = GoodsService;