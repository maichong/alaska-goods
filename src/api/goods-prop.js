/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

export async function list(ctx, next) {
  let filters = ctx.query.filters || {};
  if (typeof filters === 'string') {
    try {
      filters = JSON.parse(filters);
    } catch (e) {
      filters = {};
    }
  }
  filters.activated = true;
  if (service.util.isMongoId(ctx.query.cat)) {
    filters.catsIndex = ctx.query.cat;
  }
  ctx.query.filters = filters;
  await next();
}
