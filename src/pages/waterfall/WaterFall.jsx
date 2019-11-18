import React, { Component } from 'react';
import { getRandomPicture } from '@/utils/picture';
// import { connect } from 'dva';
// import {Spin} from 'antd';
import styles from './WaterFall.less';

const columnNum = 3;

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class WaterFall extends Component {
  state = {
    images: [[], [], []],
  };

  componentDidMount() {
    for (let i = 0; i < columnNum; i += 1) {
      getRandomPicture(src => this.setPictureSrc(i, src));
      getRandomPicture(src => this.setPictureSrc(i, src));
      getRandomPicture(src => this.setPictureSrc(i, src));
    }
  }

  setPictureSrc = (index, src) => {
    this.setState(({ images }) => {
      const newImages = [...images];
      const imageColumn = newImages[index];
      imageColumn.push(src);
      return {
        images: newImages,
      };
    });
  };

  render() {
    const { images } = this.state;
    return (
      <div className={styles.root}>
        {images.map((column, columnIndex) => (
          <div className={styles.column} key={columnIndex}>
            {column.map((src, index) =>
              src ? <img src={src} key={index} alt={`pic-${index}`} /> : null,
            )}
          </div>
        ))}
      </div>
    );
  }
}
export default WaterFall;
