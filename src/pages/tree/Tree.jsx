import React, { Component } from 'react';
// import { connect } from 'dva';
// import {Spin} from 'antd';
import { Point, QuadTree } from './QuadTree';
import styles from './Tree.less';

const background = {
  width: 1200,
  height: 500,
};

const starCount = 1000;
const mouseRange = 50;

function generatePoints(count) {
  const arr = [];
  const quadTree = new QuadTree(new Point(0, 0), background.width);
  for (let i = 0; i < count; i += 1) {
    const newPoint = new Point(Math.random() * background.width, Math.random() * background.height);
    arr.push(newPoint);
    quadTree.addPoint(newPoint);
  }
  return { arr, quadTree };
}

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
    };
    this.quadTree = undefined;
    this.prevPoints = [];
  }

  componentDidMount() {
    const { arr, quadTree } = generatePoints(starCount);
    this.setState({
      points: arr,
    });
    this.quadTree = quadTree;
  }

  componentWillUnmount() {
    this.removeListener();
  }

  mouseMoveHandler = ({ layerX: x, layerY: y }) => {
    const mouse = document.getElementById('mouse');
    if (mouse) {
      mouse.style.transform = `translate(${x - mouseRange + 4}px, ${y - mouseRange + 4}px)`;
    }
    if (!this.quadTree) return;
    const points = this.quadTree.getPointsByCircle(new Point(x, y), mouseRange);
    if (this.prevPoints.length > 0) {
      this.prevPoints.forEach(p => {
        const pointdom = document.getElementById(p.id);
        if (pointdom) {
          pointdom.style.backgroundColor = 'white';
          pointdom.style.width = '5px';
          pointdom.style.height = '5px';
        }
      });
    }
    if (points.length > 0) {
      points.forEach(p => {
        const pointdom = document.getElementById(p.id);
        if (pointdom) {
          pointdom.style.backgroundColor = 'yellow';
          pointdom.style.width = '10px';
          pointdom.style.height = '10px';
        }
      });
    }
    this.prevPoints = points;
  };

  addListener = () => {
    window.onmousemove = this.mouseMoveHandler;
  };

  removeListener = () => {
    window.onmousemove = null;
  };

  render() {
    const { points } = this.state;
    return (
      <div
        className={styles.root}
        style={{
          width: `${background.width + 10}px`,
        }}
      >
        <div
          className={styles.container}
          style={{ height: `${background.height + 10}px` }}
          onMouseEnter={this.addListener}
          onMouseLeave={this.removeListener}
        >
          {points.map(({ x, y, id }, index) => (
            <div
              id={id}
              className={styles.point}
              key={index}
              style={{ left: `${x}px`, top: `${y}px` }}
            ></div>
          ))}
          <div
            id="mouse"
            style={{ width: `${mouseRange * 2}px`, height: `${mouseRange * 2}px` }}
            className={styles.mouse}
          ></div>
        </div>
        <div className={styles.toolbar}>
          <div>toobar1</div>
          <div>toobar2</div>
        </div>
      </div>
    );
  }
}
export default Tree;
