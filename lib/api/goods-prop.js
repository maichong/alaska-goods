'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

let list = exports.list = (() => {
  var ref = _asyncToGenerator(function* (ctx, next) {
    let filters = ctx.query.filters || {};
    if (typeof filters === 'string') {
      try {
        filters = JSON.parse(filters);
      } catch (e) {
        filters = {};
      }
    }
    filters.activated = true;
    if (service.util.isObjectId(ctx.query.cat)) {
      filters.catsIndex = ctx.query.cat;
    }
    ctx.query.filters = filters;
    yield next();
  });

  return function list(_x, _x2) {
    return ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }