import React, { Component } from 'react';
import FunctionCard from 'components/functionCard';
import styles from './BinarySearch.less';

const binarySearch = (target, source) => {
  function search(start, end, target, source) {
    const middleIndex = Number(Number(Number((end - start) / 2) + Number(start)).toFixed());
    const middleValue = source[middleIndex];
    if (middleValue === target) return middleIndex;
    if (middleIndex <= 1) return '没有找到';
    if (middleValue > target) return search(start, middleIndex, target, source);
    if (middleValue < target) return search(middleIndex, end, target, source);
  }
  return search(0, source.length, target, source);
};

const arr = [1, 4, 5, 6, 8];

class BinarySearch extends Component {
  render() {
    return (
      <div className={styles.root}>
        <FunctionCard title="二分搜索" algo={binarySearch} args={[5, arr]} />
      </div>
    );
  }
}
export default BinarySearch;
