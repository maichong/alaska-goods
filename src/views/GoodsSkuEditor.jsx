/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-22
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

import { Panel, Table, Input } from 'react-bootstrap';

import '../../goods.less';

export default class GoodsSkuEditor extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
  }

  componentWillUnmount() {
  }

  render() {
    let props = this.props;
    let state = this.state;
    let styles = {
      root: {}
    };
    return (
      <Panel header="SKU">
        <Table fill className="goods-sku-editor">
          <tr>
            <th>图片</th>
            <th>库存</th>
            <th>价格</th>
            <th>折扣价</th>
            <th>销量</th>
            <th>激活</th>
            <th></th>
          </tr>
          <tr>
            <td>a</td>
            <td><input type="number"/></td>
            <td><input type="number"/></td>
            <td><input type="number"/></td>
            <td><input type="number"/></td>
            <td></td>
            <td></td>
          </tr>
        </Table>
      </Panel>
    );
  }
}
