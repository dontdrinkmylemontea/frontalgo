import React, { Component } from 'react';
// import { connect } from 'dva';
import { Divider } from 'antd';
import TextContent from './textcontent';
import styles from './Dictionaries.less';

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class Dictionaries extends Component {
  render() {
    // const { } = this.props;
    return (
      <div className={styles.root}>
        <div className={[styles.box, styles.title].join(' ')}>{TextContent.title}</div>
        <Divider />
        <div className={styles.box}>
          <div className={styles.article}>
            <div className={styles.para}>{TextContent.describe}</div>
            {TextContent.params.map(({ title, content }, pKey) => (
              <div key={pKey}>
                <div className={styles.subTitle}>{title}</div>
                {content.map((c, cKey) => (
                  <div className={styles.para} key={cKey}>
                    {c}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Dictionaries;
