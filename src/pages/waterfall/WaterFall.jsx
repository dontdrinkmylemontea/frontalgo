import React, { Component } from 'react';
import { getCattyPic } from '@/utils/picture';
import styles from './WaterFall.less';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './Loader';

const columnNum = 3;

const initArray = (initItem = 0) => {
  const newArr = [];
  for (let i = 0; i < columnNum; i += 1) {
    newArr[i] = typeof initItem === 'function' ? initItem() : initItem;
  }
  return newArr;
};
// 1 2 3
class WaterFall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: initArray(() => []),
    };
    this.columnHeight = initArray();
    this.lastFillColumn = 0;
    this.currentLoaded = 0;
    this.expectd = 0;
  }

  imgOnLoad = (e, column) => {
    this.currentLoaded += 1;
    this.columnHeight[column] += e.currentTarget.height;
  };

  onLoadMore = () => {
    console.log('触发了load more');
    this.multipleLoad(3);
  };

  multipleLoad = number => {
    if (this.expectd !== this.currentLoaded) {
      setTimeout(() => {
        this.multipleLoad(number);
      }, 1000);
      return;
    } // 如果未加载完，不继续加载
    this.expectd += number;
    console.log(`继续加载${number}张图片`, this.currentLoaded, this.expectd);
    for (let i = 0; i < number; i += 1) {
      getCattyPic(src => this.onGettingSrc((this.lastFillColumn += 1) % columnNum, src));
    }
  };

  onGettingSrc = (index, src) => {
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
        <InfiniteScroll pageStart={0} loadMore={this.onLoadMore} hasMore loader={<Loader />}>
          <div className={styles.container}>
            {images.map((column, columnIndex) => (
              <div
                className={styles.column}
                style={{ width: `${100 / columnNum}%` }}
                key={columnIndex}
                id={`column-${columnIndex}`}
              >
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
