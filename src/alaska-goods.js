/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-19
 * @author Liang <liang@maichong.it>
 */

'use strict';

import alaska from 'alaska';

export const views = {
  GoodsPropsEditor: __dirname + '/views/GoodsPropsEditor',
  GoodsSkuEditor: __dirname + '/views/GoodsSkuEditor',
  GoodsPropsValueEditor: __dirname + '/views/GoodsPropsValueEditor',
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

  /**
   * 获取商品分类列表
   */
  async cats() {
    let cache = this.cache;
    let data = await cache.get('goods_cats');
    if (data) {
      return data;
    }
    const GoodsCat = this.model('GoodsCat');
    let map = {};
    let cats = await GoodsCat.find().sort('-sort');
    cats = cats.map(cat => {
      let c = cat.data();
      c.subs = [];
      map[c.id] = c;
      return c;
    });
    cats.forEach(c => {
      if (c.parent && map[c.parent]) {
        map[c.parent].subs.push(c);
      }
    });
    cats = cats.filter(c => !c.parent);
    cache.set(cats);
    return cats;
  }
}
