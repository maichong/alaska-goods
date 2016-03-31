'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _GoodsCat = require('../models/GoodsCat');

var _GoodsCat2 = _interopRequireDefault(_GoodsCat);

var _GoodsProp = require('../models/GoodsProp');

var _GoodsProp2 = _interopRequireDefault(_GoodsProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @copyright Maichong Software Ltd. 2016 http://maichong.it
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @date 2016-03-28
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Liang <liang@maichong.it>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

/**
 * 更新分类属性关联关系
 */
class UpdatePropRef extends service.Sled {

  /**
   * @param {string|ObjectId} data.cat 分类ID
   */
  exec(data) {
    return _asyncToGenerator(function* () {
      let cid = data.cat;
      let cats = [];
      while (cid) {
        cats.push(cid);
        let cat = yield _GoodsCat2.default.findCache(cid);
        if (cat) {
          cid = cat.parent;
        } else {
          cid = '';
        }
      }
      console.log('cats', cats);
      let props = yield _GoodsProp2.default.find().where('catsIndex').in(cats);
      for (let prop of props) {
        yield prop.updateCatsIndex();
        prop.save();
      }
    })();
  }
}
exports.default = UpdatePropRef;