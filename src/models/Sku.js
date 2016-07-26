/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Sku extends alaska.Model {

  static label = 'Sku';
  static icon = 'cubes';
  static defaultColumns = 'pic goods desc inventory price valid';
  static defaultSort = '-sort';
  static noedit = true;
  static noremove = true;
  static nocreate = true;
  static title = 'desc';

  static fields = {
    pic: {
      label: 'Main Picture',
      type: 'image',
      required: true
    },
    goods: {
      label: 'Goods',
      type: 'relationship',
      ref: 'Goods',
      index: true
    },
    key: {
      label: 'KEY',
      type: String
    },
    desc: {
      label: 'Description',
      type: String
    },
    price: {
      label: 'Price',
      type: Number,
      default: 0
    },
    discount: {
      label: 'Discount',
      type: Number,
      default: 0
    },
    inventory: {
      label: 'Inventory',
      type: Number,
      default: 0
    },
    volume: {
      label: 'Volume',
      type: Number,
      default: 0,
      private: true
    },
    valid: {
      label: 'Valid',
      type: Boolean,
      private: true
    },
    props: {
      label: 'Goods Properties',
      type: Object
    },
    createdAt: {
      label: 'Created At',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
