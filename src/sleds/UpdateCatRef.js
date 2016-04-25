/**
 * UpdateCatRef
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-28
 * @author Liang <liang@maichong.it>
 */

import GoodsCat from '../models/GoodsCat';

/**
 * 更新分类父子关系
 */
export default class UpdateCatRef extends service.Sled {
  /**
   * @param {string|ObjectId} data.cat 父分类ID
   */
  async exec(data) {
    let cat = await GoodsCat.findById(data.cat);
    if (!cat) return;
    let subs = await GoodsCat.find({
      cat: cat._id
    });
    cat.subCats = subs.map(cat => cat._id);
    await cat.save();
  }
}
