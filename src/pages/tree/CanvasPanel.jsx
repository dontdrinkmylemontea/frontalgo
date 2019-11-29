import React, { Component } from 'react';
// import { connect } from 'dva';
// import {Spin} from 'antd';
import { Point } from './QuadTree';
import styles from './CanvasPanel.less';

let mouseId = 0;
let canvasId = 0;
// @connect(({ loading }) => ({
//   loadingData: loading,
// }))
class CanvasPanel extends Component {
  constructor(props) {
    super(props);
    this.prevPoints = [];
    this.mouseId = `canvas-mouse-${mouseId}`;
    this.canvasId = `canvas-${canvasId}`;
    mouseId += 1;
    canvasId += 1;
  }

  componentDidMount() {
    const { points } = this.props;
    this.renderPoints(points);
  }

  componentDidUpdate(prevProps) {
    const { points } = this.props;
    if (prevProps.points !== points) {
      this.renderPoints(points);
    }
  }

  renderPoints = (points, flag, fillStyle = '#fff', pointSize = 3) => {
    const ctx = this.getContext();
    if (!flag) this.clearCanvas();
    points.forEach(({ x, y }) => {
      ctx.beginPath();
      ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    });
  };

  clearCanvas = () => {
    const {
      background: { width, height },
    } = this.props;
    const ctx = this.getContext();
    ctx.clearRect(0, 0, width, height + 10);
  };

  getContext = () => {
    const canvas = document.getElementById(this.canvasId);
    return canvas.getContext('2d');
  };

  mouseMoveHandler = ({ layerX: x, layerY: y }) => {
    // 重新画点
    const { points } = this.props;
    this.renderPoints(points);
    // 画鼠标形状
    const { mouseRange, quadTree, mouseShape } = this.props;
    const ctx = this.getContext();
    if (mouseShape === 'circle') {
      ctx.beginPath();
      ctx.arc(x, y, mouseRange, 0, 2 * Math.PI);
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // 画圈中的点
      if (!quadTree) return;
      const inRange = quadTree.getPointsByCircle(new Point(x, y), mouseRange);
      this.renderPoints(inRange, true, 'yellow', 5);
    } else if (mouseShape === 'rectangle') {
      ctx.beginPath();
      ctx.rect(x - mouseRange, y - mouseRange, mouseRange * 2, mouseRange * 2);
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // 画圈中的点
      if (!quadTree) return;
      const inRange = quadTree.getPointsByRectangle(
        new Point(x - mouseRange, y - mouseRange),
        mouseRange * 2,
        mouseRange * 2,
      );
      this.renderPoints(inRange, true, 'yellow', 5);
    }
  };

  addListener = () => {
    window.onmousemove = this.mouseMoveHandler;
  };

  removeListener = () => {
    window.onmousemove = null;
  };

  render() {
    const { background } = this.props;
    return (
      <canvas
        className={styles.root}
        id={this.canvasId}
        width={background.width}
        height={background.height + 10}
        onMouseEnter={this.addListener}
        onMouseOut={this.removeListener}
      ></canvas>
    );
  }
}
export default CanvasPanel;
