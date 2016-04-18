/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-18
 * @author Liang <liang@maichong.it>
 */

export function list(ctx, next) {
  let cid = ctx.query.cid || '';
  ctx.state.filters = {
    cats: cid
  };
  return next();
}
