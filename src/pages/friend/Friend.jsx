import React, { Component } from 'react';
// import { connect } from 'dva';
// import {Spin} from 'antd';
// import styles from './Friend.less';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class Friend extends Component {
  render() {
    // const { } = this.props;
    return (
      <div>
        <ul>
          <li>
            <a href="http://39.108.94.69:9001/" target="_blank" rel="noopener noreferrer">
              photo
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default Friend;
