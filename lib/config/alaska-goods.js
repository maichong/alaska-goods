'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

exports.default = {
  prefix: '/goods',
  controllers: false,
  middlewares: false,
  services: [{ id: 'alaska-balance', alias: 'balance' }]
};