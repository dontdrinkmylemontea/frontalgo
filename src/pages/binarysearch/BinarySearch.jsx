import React, { Component } from 'react';
import { Typography, Divider } from 'antd';
import styles from './BinarySearch.less';

const { Title, Paragraph, Text } = Typography;

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class BinarySearch extends Component {
  render() {
    // const { } = this.props;
    return (
      <div className={styles.root}>
        <Typography>
          <Title>二分搜索</Title>
          <Paragraph>二分搜索</Paragraph>
        </Typography>
      </div>
    );
  }
}
export default BinarySearch;
