/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { api } from 'alaska-admin-view';

import Select from 'alaska-field-select/lib/Select';

import _ from 'lodash';

export default class GoodsPropsEditor extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  static contextTypes = {
    settings: React.PropTypes.object,
    t: React.PropTypes.func,
  };

  constructor(props, context) {
    super(props);
    let service = context.settings.services['alaska-goods'];
    //let model = service.models.GoodsProps;
    this.state = {
      service,
      goodsProps: [],
      goodsPropsMap: {},
      valueMap: this.arrayToMap(props.value)
    };
  }

  componentDidMount() {
    this.fetchProps();
  }

  componentWillReceiveProps(props) {
    let newState = {};
    if (props.value) {
      newState.valueMap = this.arrayToMap(props.value);
      this.setState(newState);
    }
    if (props.data.cat != this._cat) {
      this.fetchProps(props.data.cat);
    }
  }

  fetchProps = (cat) => {
    cat = cat || this.props.data.cat;
    if (this._cat == cat) {
      return;
    }
    this._cat = cat;
    api.get(this.state.service.prefix + '/api/goods-prop?cat=' + cat).then(res => {
      let map = {};
      _.each(res.results, prop => {
        map[prop.id] = prop;
        prop.options = _.map(prop.values, v => ({ label: v.title, value: v.id }));
      });
      this.setState({
        goodsProps: res.results,
        goodsPropsMap: map
      }, this.update);
    });
  };

  arrayToMap(array) {
    let map = {};
    _.each(array, v=> {
      map[v.id] = v;
    });
    return map;
  }

  onChange = () => {
    let goodsProps = this.state.goodsProps;
    let valueMap = this.state.valueMap;
    let values = [];
    _.each(goodsProps, p => {
      let prop = valueMap[p.id];
      if (prop && prop.values.length) {
        values.push(prop);
      }
    });
    this.props.onChange(values);
  };

  render() {
    let props = this.props;
    let data = props.data;
    const t = this.context.t;
    if (!data.cat) {
      return <p className="text-center">{t('Select goods category first!', 'alaska-goods')}</p>;
    }
    let goodsProps = this.state.goodsProps;
    if (!goodsProps || !goodsProps.length) {
      return <p className="text-center">Loading...</p>;
    }

    let valueMap = this.state.valueMap;
    let me = this;

    let list = [];
    goodsProps.forEach((p, index) => {
      if (!valueMap[p.id]) {
        valueMap[p.id] = {
          id: p.id,
          title: p.title,
          sku: p.sku,
          filter: p.filter,
          values: []
        };
      }

      function handleChange(value) {
        if (p.multi) {
          valueMap[p.id].values = value;
        } else {
          valueMap[p.id].values = value ? [value] : [];
        }
        me.setState({ valueMap }, me.onChange);
      }

      let value = valueMap[p.id].values;

      if (!p.multi) {
        value = value.length ? value[0] : '';
      }

      let help = [];
      if (p.required) {
        help.push(t('Required', 'alaska-goods'));
      }
      if (p.sku) {
        help.push(t('SKU', 'alaska-goods'));
      }
      if (p.multi) {
        help.push(t('Multi', 'alaska-goods'));
      }
      if (p.filter) {
        help.push(t('Filter', 'alaska-goods'));
      }
      if (p.input) {
        help.push(t('Input', 'alaska-goods'));
      }
      if (help.length) {
        help = `( ${help.join(' ')} ) `;
      } else {
        help = '';
      }
      if (p.help) {
        help += p.help;
      }

      list.push(
        <div className="form-group" key={index}>
          <label className="control-label col-xs-2">{p.title}</label>
          <div className="col-xs-10">
            <Select
              value={value}
              multi={p.multi}
              options={p.options}
              allowCreate={p.input}
              onChange={handleChange}
            />
            <p className="help-block">{help}</p>
          </div>
        </div>
      );
    });

    return (
      <div>{list}</div>
    );
  }
}
