import React, { Component } from 'react';
// import { connect } from 'dva';
// import {Spin} from 'antd';
// import styles from './Comparison.less';
import FunctionCard from 'components/functionCard';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class Comparison extends Component {
  render() {
    // const { } = this.props;
    return (
      <div>
        <FunctionCard title="Array.filter">Array.filter</FunctionCard>
        <FunctionCard title="二分搜索"></FunctionCard>
      </div>
    );
  }
}
export default Comparison;
