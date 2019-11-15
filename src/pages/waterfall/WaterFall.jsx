import React, { Component } from 'react';
import { getRandomPicture } from '@/utils/picture';
// import { connect } from 'dva';
// import {Spin} from 'antd';
// import styles from './WaterFall.less';

const count = 5;

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class WaterFall extends Component {
  state = {
    images: [],
  };

  componentDidMount() {
    for (let i = 0; i < count; i += 1) {
      getRandomPicture(src => this.setPictureSrc(i, src), this.setLoading);
    }
  }

  setLoading = index => {
    this.setState(({ images }) => {
      const newImages = [...images];
      const image = { loading: true };
      newImages[index] = image;
      return {
        images: newImages,
      };
    });
  };

  setPictureSrc = (index, src) => {
    this.setState(({ images }) => {
      const newImages = [...images];
      const image = { loading: false, src };
      newImages[index] = image;
      return {
        images: newImages,
      };
    });
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        {images.map((item = {}, index) =>
          item.src ? <img src={item.src} key={index} alt={`pic-${index}`} /> : null,
        )}
      </div>
    );
  }
}
export default WaterFall;
