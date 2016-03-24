/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { Panel, Table, Input } from 'react-bootstrap';

import '../../goods.less';

import _ from 'lodash';

/**
 * @param value
 * @param props
 * @returns {[]}
 */
function updateValue(value, goodsProps, goodsPropsMap) {
  value = value || [];
  let skuProps = [];
  goodsProps.forEach(prop => {
    if (prop.sku) {
      skuProps.push(prop);
    }
  });
  if (!skuProps.length) {
    return value;
  }

  function create(index, req) {
    let res = [];
    let prop = skuProps[index];
    if (!index) {
      _.forEach(prop.values, v=> {
        res.push({
          props: {
            [prop.id]: v.value
          }
        });
      });
    } else {
      _.forEach(req, p => {
        _.forEach(prop.values, v=> {
          let props = _.assign({}, p.props, {
            [prop.id]: v.value
          });
          res.push({ props });
        });
      });
    }

    index++;

    if (index < skuProps.length) {
      return create(index, res);
    }
    return res;
  }

  let skuMap = _.reduce(create(0, {}), (res, s) => {
    let sortedKeys = Object.keys(s.props).sort();
    //56f124ad50443e202b820a0d:散装|56f12e1d50443e202b820a11:56f12e3b50443e202b820a12
    s.key = sortedKeys.map(id => id + ':' + s.props[id]).join('|');
    //规格:散装|套餐:官方套餐
    s.desc = sortedKeys.map(id => goodsPropsMap[id].title + ':' + goodsPropsMap[id].valueMap[s.props[id]].label).join('|');
    s.valid = true;
    res[s.key] = s;
    return res;
  }, {});
  value.forEach(v => {
    if (!v.key) {
      return;
    }
    if (skuMap[v.key]) {
      //如果sku记录在允许中
      v.valid = true;
      skuMap[v.key] = v;
    } else if (v.price && v.inventory) {
      //如果sku不在允许中,并且sku已经设置了价格和库存
      v.valid = false;
      let s = _.find(skuMap, s => {
        if (s.id || s.price || s.inventory) {
          return false;
        }
        for (let k in v.props) {
          if (s.props[k] != v.props[k]) {
            return false;
          }
        }
        return true;
      });
      if (s) {
        s.id = v.id;
        s.price = v.price;
        s.discount = v.discount;
        s.inventory = v.inventory;
        s.volume = v.volume;
      } else {
        skuMap[v.key] = v;
      }
    }//else 没有在允许的sku列表中,同时本sku记录无效,直接抛弃
  });
  return _.values(skuMap);
}

function createPropsMap(props) {
  let map = {};
  props.forEach(p=> {
    let item = _.assign({}, p);
    item.valueMap = {};
    p.values.forEach(v=> {
      item.valueMap[v.value] = v;
    });
    map[item.id] = item;
  });
  return map;
}

export default class GoodsSkuEditor extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      goodsProps: props.data.props,
      goodsPropsMap: createPropsMap(props.data.props)
    };
    this.state.value = updateValue(props.value, this.state.goodsProps, this.state.goodsPropsMap);
    this._trCache = {};
  }

  componentWillReceiveProps(props) {
    let newState = {};
    if (props.value !== undefined) {
      newState.value = props.value;
    }
    if (props.data && props.data.props != this.state.goodsProps) {
      newState.goodsProps = props.data.props;
      newState.goodsPropsMap = createPropsMap(props.data.props);
      newState.value = updateValue(props.value || this.state.value, newState.goodsProps, newState.goodsPropsMap);
      this._trCache = {};
    }
    this.setState(newState);
  }

  shouldComponentUpdate(props, state) {
    return state.value != this.state.value;
  }

  render() {
    //let { value } = this.props;
    let { value } = this.state;
    let trs = [];
    let me = this;
    let trCache = me._trCache;

    value.forEach((s, index) => {
      if (trCache[s.key]) {
        trs.push(trCache[s.key]);
        return;
      }
      function onChangeInventory(e) {
        s.inventory = parseInt(e.target.value);
        delete trCache[s.key];
        me.props.onChange(value.slice());
      }

      function onChangePrice(e) {
        s.price = parseFloat(e.target.value);
        delete trCache[s.key];
        me.props.onChange(value.slice());
      }

      function onChangeDiscount(e) {
        s.discount = parseFloat(e.target.value);
        delete trCache[s.key];
        me.props.onChange(value.slice());
      }

      let className = (!s.price || !s.inventory) ? 'warning' : '';
      let disabled = false;
      let remove;
      if (!s.valid) {
        className = 'danger';
        disabled = 'disabled';
        remove = function () {
          delete trCache[s.key];
          me.props.onChange(_.without(value, s));
        }
      }
      let pic = s.pic || this.props.data.pic;
      trCache[s.key] = (
        <tr key={index} className={className}>
          <td><img src={pic.thumbUrl}/></td>
          <td className="desc" dangerouslySetInnerHTML={{__html: s.desc.replace(/\|/g,'<br/>')}}/>
          <td><input type="number" disabled={disabled} value={s.inventory} onChange={onChangeInventory}/></td>
          <td><input type="number" disabled={disabled} value={s.price} onChange={onChangePrice}/></td>
          <td><input type="number" disabled={disabled} value={s.discount} onChange={onChangeDiscount}/></td>
          <td className="text-center text-danger"><i className="fa fa-close" onClick={remove}/></td>
        </tr>
      );
      trs.push(trCache[s.key]);
    });
    return (
      <Panel header="SKU">
        <Table fill className="goods-sku-editor">
          <thead>
          <tr>
            <th>图片</th>
            <th>属性</th>
            <th>库存</th>
            <th>价格</th>
            <th>折扣价</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {trs}
          </tbody>
        </Table>
      </Panel>
    );
  }
}
