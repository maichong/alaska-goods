/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-18
 * @author Liang <liang@maichong.it>
 */

const Goods = service.model('Goods');

export function list(ctx, next) {
  let cid = ctx.query.cid || '';
  ctx.state.filters = {
    cats: cid
  };
  return next();
}

//获取某个分类下的10个最新产品
export async function newest(ctx) {
  let cid = ctx.query.cid || service.error(400);
  const cache = service.cache;
  let cacheKey = 'goods_newest_' + cid;
  let results = await cache.get(cacheKey);
  if (!results) {
    results = await Goods.find({ activated: true }).sort('-createdAt').limit(10);
    results = results.map(goods => goods.data().omit('desc', 'pics', 'skus', 'cat'));
    cache.set(cacheKey, results, 3600);
  }
  ctx.body = results;
}

//获取某个分类下的10个热销产品
export async function popular(ctx) {
  let cid = ctx.query.cid || service.error(400);
  const cache = service.cache;
  let cacheKey = 'goods_popular_' + cid;
  let results = await cache.get(cacheKey);
  if (!results) {
    results = await Goods.find({ activated: true }).sort('-volume -sort').limit(10);
    results = results.map(goods => goods.data().omit('desc', 'pics', 'skus', 'cat'));
    cache.set(cacheKey, results, 3600);
  }
  ctx.body = results;
}
