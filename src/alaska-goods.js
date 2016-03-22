/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-19
 * @author Liang <liang@maichong.it>
 */

'use strict';

import alaska from 'alaska';

export const views = {
  GoodsPropsEditor: __dirname + '/views/GoodsPropsEditor'
};


/**
 * @class GoodsService
 */
export default class GoodsService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.id = 'alaska-goods';
    options.dir = __dirname;
    super(options, alaska);
  }
}
