/**
 * UpdateCatRef
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('../models/GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

/**
 * 更新分类父子关系
 */
class UpdateCatRef extends __service.Sled {
  /**
   * @param {string|ObjectId} data.cat 父分类ID
   */
  exec(data) {
    return _asyncToGenerator(function* () {
      let cat = yield _GoodsCat2.default.findById(data.cat);
      if (!cat) {
        return;
      }
      let subs = yield _GoodsCat2.default.find({
        cat: cat._id
      });
      cat.subCats = subs.map(function (cat) {
        return cat._id;
      });
      yield cat.save();
    })();
  }
}
exports.default = UpdateCatRef;