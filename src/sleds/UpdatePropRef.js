/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

'use strict';

import GoodsCat from '../models/GoodsCat';
import GoodsProp from '../models/GoodsProp';

/**
 * 更新分类属性关联关系
 */
export default class UpdatePropRef extends __service.Sled {

  /**
   * @param {string|ObjectId} data.cat 分类ID
   */
  async exec(data) {
    console.log('UpdatePropRef.exec', data);
    let cid = data.cat;
    let cats = [];
    while (cid) {
      cats.push(cid);
      let cat = await GoodsCat.findCache(cid);
      if (cat) {
        cid = cat.parent;
      } else {
        cid = '';
      }
    }
    console.log('cats', cats);
    let props = await GoodsProp.find().where('catsIndex').in(cats);
    for (let prop of props) {
      await prop.updateCatsIndex();
      prop.save();
    }
  }
}
