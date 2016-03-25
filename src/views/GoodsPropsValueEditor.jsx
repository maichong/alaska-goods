/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-03-25
 * @author Liang <liang@maichong.it>
 */

import React from 'react';

export default class GoodsPropsValueEditor extends React.Component {

  static propTypes = {};

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
      <div style={styles.root}>GoodsPropsValueEditor Component</div>
    );
  }
}
