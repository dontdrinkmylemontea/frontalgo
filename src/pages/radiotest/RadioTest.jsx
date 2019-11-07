import React, { Component } from 'react';
import { Radio } from 'antd';
// import { connect } from 'dva';
// import {Spin} from 'antd';
// import styles from './RadioTest.less';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class RadioTest extends Component {
  state = {
    value: 1,
  };

  sleep = numberMillis => {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
      now = new Date();
      if (now.getTime() > exitTime) return;
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
    // setImmediate(() => this.sleep(1000));
    setTimeout(() => {
      this.sleep(1000);
    }, 100);
    console.log('end.');
  };

  render() {
    // const { } = this.props;
    return (
      <div>
        <Radio.Group onChange={this.onChange} value={this.state.value}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </div>
    );
  }
}
export default RadioTest;
