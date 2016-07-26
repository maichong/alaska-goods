/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-19
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export const views = {
  GoodsPropsEditor: __dirname + '/views/GoodsPropsEditor',
  GoodsSkuEditor: __dirname + '/views/GoodsSkuEditor',
  GoodsPropsValueEditor: __dirname + '/views/GoodsPropsValueEditor',
};

/**
 * @class GoodsService
 */
class GoodsService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-goods';
    super(options, alaska);
  }

  preLoadConfig() {
    let ORDER = alaska.service('alaska-order', true);
    if (ORDER) {
      ORDER.addConfigDir(__dirname + '/config/alaska-order');
    }
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
    cats = cats.filter(c => {
      let res = !c.parent;
      delete c.parent;
      if (!c.subs.length) {
        delete c.subs;
      }
      return res;
    });
    cache.set(cats);
    return cats;
  }

  clearCache() {
    if (!this._clearCacheTimer) {
      this._clearCacheTimer = setTimeout(() => {
        let cache = this.cache;
        this._clearCacheTimer = 0;
        cache.del('goods_cats');
      }, 5);
    }
  }
}

export default new GoodsService();
