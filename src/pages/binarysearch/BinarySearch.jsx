import React, { Component } from 'react';
import FunctionCard from 'components/functionCard';
import styles from './BinarySearch.less';

const binarySearch = source => {
  return source;
};

const arr = [1, 4, 5, 6, 8];

class BinarySearch extends Component {
  render() {
    return (
      <div className={styles.root}>
        <FunctionCard title="二分搜索" algo={binarySearch} array={arr} />
      </div>
    );
  }
}
export default BinarySearch;
