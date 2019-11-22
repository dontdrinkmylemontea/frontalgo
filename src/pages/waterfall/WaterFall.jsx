import React, { Component } from 'react';
import { getRandomPicture, getCattyPic } from '@/utils/picture';
import styles from './WaterFall.less';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './Loader';
// import { connect } from 'dva';
// import {Spin} from 'antd';

const columnNum = 3;

const initArray = (initItem = 0) => {
  const newArr = [];
  for (let i = 0; i < columnNum; i += 1) {
    newArr[i] = typeof initItem === 'function' ? initItem() : initItem;
  }
  console.log('newArr = ', newArr);
  return newArr;
};

// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class WaterFall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: initArray(() => []),
    };
    this.columnHeight = initArray();
  }

  componentDidMount() {
    for (let i = 0; i < columnNum; i += 1) {
      getCattyPic(src => this.setPictureSrc(i, src));
      getCattyPic(src => this.setPictureSrc(i, src));
      getCattyPic(src => this.setPictureSrc(i, src));
    }
  }

  imgOnLoad = (e, column) => {
    this.columnHeight[column] += e.currentTarget.height;
    console.log('this.columnHeight = ', this.columnHeight);
  };

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

  onLoadMore = page => {
    console.log('load more');
  };

  render() {
    const { images } = this.state;
    return (
      <div className={styles.root}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.onLoadMore}
          hasMore={true || false}
          loader={<Loader />}
        >
          <div className={styles.container}>
            {images.map((column, columnIndex) => (
              <div className={styles.column} key={columnIndex} id={`column-${columnIndex}`}>
                {column.map((src, index) =>
                  src ? (
                    <img
                      src={src}
                      key={index}
                      alt={`pic-${index}`}
                      onLoad={e => this.imgOnLoad(e, columnIndex)}
                    />
                  ) : null,
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
export default WaterFall;
