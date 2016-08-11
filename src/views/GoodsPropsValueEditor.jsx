/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import { actions } from 'alaska-admin-view';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const { func } = React.PropTypes;

class GoodsPropsValueEditor extends React.Component {

  static contextTypes = {
    t: func
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSave();
      event.preventDefault();
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSave = () => {
    let value = this.state.value.trim();
    if (!value) return;
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
    const t = this.context.t;
    let state = this.state;
    return (
      <div className="row">
        <div className="col-md-5 col-md-offset-2">
          <input className="form-control" placeholder={t('Please input property value','alaska-goods')}
                 value={state.value}
                 onKeyPress={this.handleKeyPress}
                 onChange={this.handleChange}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary btn-block" onClick={this.handleSave}>{t('Save')}</button>
        </div>
      </div>
    );
  }
}

export default connect(({ }) => ({}), dispatch => ({
  actions: bindActionCreators(actions, dispatch)
}))(GoodsPropsValueEditor);
