import React, { Component } from 'react';
// import {Spin} from 'antd';
import { Point } from './QuadTree';
import styles from './DomPanel.less';

let mouseId = 0;

class DomPanel extends Component {
  constructor(props) {
    super(props);
    this.prevPoints = [];
    this.mouseId = mouseId;
    mouseId += 1;
  }

  componentWillUnmount() {
    this.removeListener();
  }

  mouseMoveHandler = ({ layerX: x, layerY: y }) => {
    const { mouseRange, quadTree } = this.props;
    const mouse = document.getElementById(this.mouseId);
    if (mouse) {
      mouse.style.transform = `translate(${x - mouseRange + 4}px, ${y - mouseRange + 4}px)`;
    }
    if (!quadTree) return;
    const points = quadTree.getPointsByCircle(new Point(x, y), mouseRange);
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
    const { background, points, mouseRange } = this.props;
    return (
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
            style={{ left: `${x}px`, top: `${y}px`, pointerEvents: 'none' }}
          ></div>
        ))}
        <div
          id={this.mouseId}
          style={{ width: `${mouseRange * 2}px`, height: `${mouseRange * 2}px` }}
          className={styles.mouse}
        ></div>
      </div>
    );
  }
}
export default DomPanel;
