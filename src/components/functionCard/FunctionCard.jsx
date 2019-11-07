import React from 'react';
import { Card, Icon } from 'antd';
import styles from './FunctionCard.less';

const algoWrapper = algo => array => {
  const startTime = new Date().getTime();
  const result = algo(array);
  const endTime = new Date().getTime();
  const timeSpent = endTime - startTime;
  return { timeSpent, result };
};

const FunctionCard = ({ title, children, algo, array }) => (
  <Card
    style={{ width: 300, marginBottom: '30px', marginRight: '20px' }}
    actions={[<Icon type="caret-right" key="caret-right" />]}
    title={title}
  >
    {children}
    {algo ? <div className={styles.sourceCode}>{algo.toString()}</div> : null}
    {(() => {
      let result = {};
      if (algo) {
        const algoTimmer = algoWrapper(algo);
        result = algoTimmer(array || []);
        console.log('result = ', result);
      }
      return (
        <>
          <br />
          执行结果：{result.result || '--'}
          <br />
          执行时间：{result.timeSpent} s
        </>
      );
    })()}
  </Card>
);

export default FunctionCard;
