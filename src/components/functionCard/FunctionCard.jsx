import React, { Component } from 'react';
import { Card, Icon, Spin } from 'antd';
import { algosWorker } from '@/utils/workerhelper.js';
import styles from './FunctionCard.less';

const LabelText = ({ label, value }) => (
  <div>
    {label}:&nbsp;&nbsp;&nbsp;{value}
  </div>
);

const renderLongText = (arr, splitter = ',') => {
  if (arr && arr.length > 0) {
    const text = arr.join(splitter);
    if (text.length >= 80) {
      return <span title={arr.join(splitter).slice(0, 512)}>{text.slice(0, 80) + '……'}</span>;
    } else {
      return text;
    }
  } else {
    return '--';
  }
};

class FunctionCard extends Component {
  state = {
    codeVisible: false,
    result: {},
    running: false,
  };

  worker = null;

  componentDidMount() {
    this.runWorker();
  }

  componentDidUpdate(prevProps) {
    if (this.props.args !== prevProps.args) {
      this.runWorker();
    }
  }

  runWorker = () => {
    const { algo, args } = this.props;
    algosWorker(args, algo, this.start, this.end);
  };

  start = () => this.setState({ running: true });

  end = data => {
    this.setState({
      running: false,
      result: data,
    });
  };

  render() {
    const { title, children, algo, array, args, loading } = this.props;
    const {
      codeVisible,
      result: { value, timeSpent },
      running,
    } = this.state;
    return (
      <div className={styles.root}>
        <Spin spinning={loading}>
          <Card
            actions={[
              <Icon
                type={running ? 'loading' : 'caret-right'}
                key="caret-right"
                style={{ color: running ? '#1890ff' : 'rgba(0, 0, 0, 0.45)' }}
                onClick={this.runWorker}
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
              value={'[ ' + args ? renderLongText(args, ' ') : renderLongText(array) + ' ]'}
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
        </Spin>
      </div>
    );
  }
}

export default FunctionCard;
