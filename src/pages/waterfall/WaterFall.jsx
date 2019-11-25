import React, { Component } from 'react';
import { getCattyPic } from '@/utils/picture';
import styles from './WaterFall.less';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from './Loader';

const columnNum = 4;

const initArray = (initItem = 0) => {
  const newArr = [];
  for (let i = 0; i < columnNum; i += 1) {
    newArr[i] = typeof initItem === 'function' ? initItem() : initItem;
  }
  return newArr;
};
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

  imgOnError = (column, index) => {
    this.expectd -= 1;
    this.setState(({ images }) => {
      images[column][index] = null;
      return {
        images,
      };
    });
  };

  onLoadMore = () => {
    console.log('触发了load more');
    this.multipleLoad(3);
  };

  multipleLoad = number => {
    if (number <= 0) return;
    if (this.expectd !== this.currentLoaded) {
      // 如果未加载完，不继续加载
      setTimeout(() => {
        this.multipleLoad(number);
      }, 1000);
      return;
    }
    this.expectd += 1;
    console.log(`number = ${number}`, this.currentLoaded, this.expectd, this.columnHeight);
    let minIndex = 0;
    let minVal = this.columnHeight[0];
    for (let i = 0; i < this.columnHeight.length; i += 1) {
      if (this.columnHeight[i] < minVal) {
        minIndex = i;
        minVal = this.columnHeight[i];
      }
    }
    getCattyPic(src => this.onGettingSrc(minIndex, src));
    this.multipleLoad(number - 1);
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
              >
                {column.map((src, index) =>
                  src ? (
                    <img
                      src={src}
                      key={index}
                      alt={`pic-${index}`}
                      onLoad={e => this.imgOnLoad(e, columnIndex)}
                      onError={() => this.imgOnError(columnIndex, index)}
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
