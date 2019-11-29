import React, { Component } from 'react';
import SearchPanel from './SearchPanel';
import styles from './Tree.less';

class Tree extends Component {
  render() {
    return (
      <div className={styles.root}>
        <SearchPanel type="dom" />
        <SearchPanel type="canvas" />
      </div>
    );
  }
}
export default Tree;
