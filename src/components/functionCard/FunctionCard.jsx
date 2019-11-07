import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import styles from './FunctionCard.less';

const algoWrapper = algo => (...args) => {
  const startTime = new Date().getTime();
  const algoResult = algo(...args);
  let result;
  if (Array.isArray(algoResult)) {
    result = algoResult.join(' ');
  } else {
    result = algoResult;
  }
  const endTime = new Date().getTime();
  const timeSpent = endTime - startTime;
  return { timeSpent, value: result };
};

const LabelText = ({ label, value }) => (
  <div>
    {label}:&nbsp;&nbsp;&nbsp;{value}
  </div>
);

class FunctionCard extends Component {
  state = {
    codeVisible: false,
    result: {},
    running: false,
  };

  componentDidMount() {
    this.runArgs();
  }

  runArgs = () => {
    this.setState({
      running: true,
    });
    const { algo, array, args } = this.props;
    let result = {};
    if (algo) {
      const algoTimmer = algoWrapper(algo);
      result = args ? algoTimmer(...args) : algoTimmer(array);
    }
    this.setState({
      result,
      running: false,
    });
  };

  render() {
    const { title, children, algo, array, args } = this.props;
    const {
      codeVisible,
      result: { value, timeSpent },
      running,
    } = this.state;
    return (
      <div className={styles.root}>
        <Card
          style={{ width: '700px' }}
          actions={[
            <Icon
              type={running ? 'loading' : 'caret-right'}
              key="caret-right"
              style={{ color: running ? '#1890ff' : 'auto' }}
              onClick={this.runArgs}
            />,
            <Icon
              type={codeVisible ? 'eye-invisible' : 'eye'}
              key="eye"
              onClick={() => this.setState(pre => ({ codeVisible: !pre.codeVisible }))}
            />,
          ]}
          title={title}
        >
          <LabelText
            label={'入参'}
            value={'[ ' + args ? (args || []).join(' ') : (array || []).join(',') + ' ]'}
          />
          {children}
          <LabelText label={'耗时'} value={timeSpent + ' ms'} />
          <LabelText label={'执行结果'} value={value} />
        </Card>
        {algo && codeVisible ? (
          <Card>
            <div
              className={styles.sourceCode}
              dangerouslySetInnerHTML={{
                __html: algo
                  .toString()
                  .replace(/\n/g, '<br/>')
                  .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
                  .replace(/ /g, '&nbsp;'),
              }}
            ></div>
          </Card>
        ) : null}
      </div>
    );
  }
}

export default FunctionCard;
