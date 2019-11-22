import React, { Component } from 'react';
import { ScaleLoader } from 'react-spinners';
// import { connect } from 'dva';
// import {Spin} from 'antd';
import styles from './Loader.less';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class Loader extends Component {
  render() {
    return (
      <div className={styles.root}>
        <ScaleLoader sizeUnit={'px'} size={50} color={'#000000'} loading />
      </div>
    );
  }
}
export default Loader;
