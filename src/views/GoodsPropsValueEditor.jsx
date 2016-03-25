/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { PREFIX, api } from 'alaska-admin-view';
import { stringify } from 'qs';
import {Button} from 'react-bootstrap';

export default class GoodsPropsValueEditor extends React.Component {

  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      display:''
    };
  }
  handleChange=(event)=>{
    this.setState({display:event.target.value});
  };
  handleSave=()=>{
    api.post(PREFIX+'/api/save?' + stringify({
        service:'alaska-goods',
        model:'GoodsPropValue'
      }),{
      prop:this.props.data._id,
      title:this.state.display
    }).then(res=>{
      location.reload();
    });
  };

  render() {
    let props = this.props;
    let state = this.state;
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-2">
          <input className="form-control" value={state.display} onChange={this.handleChange}/>
        </div>
        <div className="col-md-2">
          <Button bsStyle="primary" onClick={this.handleSave} block>保存</Button> 
        </div>
      </div>
    );
  }
}
