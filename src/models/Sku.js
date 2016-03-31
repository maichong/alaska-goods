/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-07
 * @author Liang <liang@maichong.it>
 */

export default class Sku extends service.Model {

  static label = 'Sku';
  static defaultColumns = 'pic,goods,desc,inventory,price,valid';
  static defaultSort = '-sort';
  static noedit = true;
  static noremove = true;
  static nocreate = true;
  static title = 'desc';

  static fields = {
    pic: {
      label: 'Main Picture',
      type: 'image',
      require: true
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
