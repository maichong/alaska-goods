/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { PREFIX, actions } from 'alaska-admin-view';
import { stringify } from 'qs';
import { Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GoodsPropsValueEditor extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleKeyPress = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      this.handleSave();
      event.preventDefault();
    }
  };

  handleChange = (event)=> {
    console.log(event.target.value,event.key);
    this.setState({ value: event.target.value });
  };

  handleSave = ()=> {
    let value = this.state.value.trim();
    if (!value) {
      return;
    }
    this.setState({ value: '' });
    this.props.actions.save({
      service: 'alaska-goods',
      model: 'GoodsPropValue',
      key: 'alaska-goods.goods-prop-value',
      data: {
        prop: this.props.data._id,
        title: this.state.value
      }
    });
  };

  shouldComponentUpdate(props, state) {
    return state.value !== this.state.value;
  }
  render() {
    let state = this.state;
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-2">
          <input className="form-control" placeholder="请输入属性值标题" value={state.value} onKeyPress={this.handleKeyPress} onChange={this.handleChange}
                 />
        </div>
        <div className="col-md-2">
          <Button bsStyle="primary" onClick={this.handleSave} block>保存</Button>
        </div>
      </div>
    );
  }
}

export default connect(({ }) => ({}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(GoodsPropsValueEditor);
