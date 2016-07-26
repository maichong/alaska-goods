/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-21
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export function list(ctx, next) {
  let filters = ctx.state.filters || ctx.query.filters || {};
  filters.activated = true;
  if (alaska.util.isObjectId(ctx.query.cat)) {
    filters.catsIndex = ctx.query.cat;
  }
  ctx.state.filters = filters;
  return next();
}
