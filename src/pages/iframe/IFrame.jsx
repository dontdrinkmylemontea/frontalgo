import React, { Component } from 'react';
// import { connect } from 'dva';
// import {Spin} from 'antd';
import styles from './IFrame.less';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class IFrame extends Component {
  render() {
    // const { } = this.props;
    return (
      <div className={styles.root}>
        <iframe title="test-iframe" src="https://www.baidu.com"></iframe>
      </div>
    );
  }
}
export default IFrame;
