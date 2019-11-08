import React, { Component } from 'react';
import FunctionCard from 'components/functionCard';
import { Radio, Button } from 'antd';
import styles from './BinarySearch.less';
import { getRandomNumber, easySorted } from 'utils';

const binarySearch = (target, source) => {
  function search(start, end, target, source) {
    const middleIndex = Number(Number(Number((end - start) / 2) + Number(start)).toFixed());
    const middleValue = source[middleIndex];
    if (middleValue === target) return middleIndex;
    if (middleIndex <= 1) return '没有找到';
    if (middleValue > target) return search(start, middleIndex - 1, target, source);
    if (middleValue < target) return search(middleIndex + 1, end, target, source);
  }
  return search(0, source.length, target, source);
};

const foreachSearch = (target, source) => {
  for (let i = 0; i < source.length; i++) {
    if (target === source[i]) return i;
  }
};

const argLengths = [1000, 10000, 100000, 1000000, 10000000];

class BinarySearch extends Component {
  state = {
    args: undefined,
    length: argLengths[0],
    arrLoading: false,
  };

  componentDidMount() {
    this.generageArgs();
  }

  generageArgs = () => {
    this.setState(
      {
        arrLoading: true,
      },
      () => {
        setTimeout(() => {
          const { length } = this.state;
          const array = easySorted(length);
          this.setState({
            args: [array[getRandomNumber(length)], array],
            arrLoading: false,
          });
        }, 100);
      },
    );
  };

  setLength = e => {
    this.setState(
      {
        length: e.target.value,
        arrLoading: true,
      },
      () => {
        this.generageArgs();
      },
    );
  };

  render() {
    const { args, length, arrLoading } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.radios}>
          <div>请选择数组长度：</div>
          <Radio.Group value={length} onChange={this.setLength}>
            {argLengths.map(len => (
              <Radio value={len} key={len}>
                {len}
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <div className={styles.radios}>
          <Button onClick={this.generageArgs}>重新装填数组</Button>
        </div>
        <div className={styles.algos}>
          <div className={styles.algo}>
            <FunctionCard loading={arrLoading} title="二分搜索" algo={binarySearch} args={args}>
              时间复杂度：O（log2n）= {Math.log(2 * length)}
            </FunctionCard>
          </div>
          <div className={styles.algo}>
            <FunctionCard loading={arrLoading} title="遍历查找" algo={foreachSearch} args={args}>
              时间复杂度：O（n）= {length}
            </FunctionCard>
          </div>
        </div>
        <div className={styles.radios}>
          结论：虽然顺序查找和二分搜索的时间复杂度差距很大，但是在10万以下的数据量查找时，两者的差距并不大。要求前端处理10万以上的数据量的情况并不多，因此这个不太实用。
        </div>
      </div>
    );
  }
}
export default BinarySearch;
