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
    this.svgId = `svg-${mouseId}`;
    mouseId += 1;
  }

  componentWillUnmount() {
    this.removeListener();
  }

  mouseMoveHandler = ({ layerX: x, layerY: y }) => {
    const { mouseRange, quadTree, mouseShape, colorMapper } = this.props;
    const mouse = document.getElementById(this.mouseId);
    if (mouse) {
      mouse.style.transform = `translate(${x - mouseRange + 4}px, ${y - mouseRange + 4}px)`;
    }
    if (!quadTree) return;
    const points =
      mouseShape === 'circle'
        ? quadTree.getPointsByCircle(new Point(x, y), mouseRange)
        : quadTree.getPointsByRectangle(
            new Point(x - mouseRange, y - mouseRange),
            mouseRange * 2,
            mouseRange * 2,
          );
    if (this.prevPoints.length > 0) {
      this.prevPoints.forEach(p => {
        const pointdom = document.getElementById(p.id);
        if (pointdom) {
          pointdom.style.backgroundColor = colorMapper.point;
          pointdom.style.width = '5px';
          pointdom.style.height = '5px';
        }
      });
    }
    points.forEach(p => {
      const pointdom = document.getElementById(p.id);
      if (pointdom) {
        pointdom.style.backgroundColor = colorMapper.active;
        pointdom.style.width = '10px';
        pointdom.style.height = '10px';
      }
    });

    if (mouseShape === 'line') {
      const svgDom = document.getElementById(this.svgId);
      const children = svgDom.childNodes;
      children.forEach(c => {
        svgDom.removeChild(c);
      });

      points.forEach(({ x: px, y: py }) => {
        const lineDom = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineDom.setAttribute('x1', px + 2);
        lineDom.setAttribute('y1', py + 2);
        lineDom.setAttribute('x2', x);
        lineDom.setAttribute('y2', y);
        lineDom.setAttribute('stroke', colorMapper.stroke);
        lineDom.setAttribute('strokeWidth', 2);
        svgDom.appendChild(lineDom);
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
    const { background, points, mouseRange, mouseShape, colorMapper } = this.props;
    return (
      <div
        className={styles.container}
        style={{ height: `${background.height + 10}px`, backgroundColor: colorMapper.background }}
        onMouseEnter={this.addListener}
        onMouseLeave={this.removeListener}
      >
        {points.map(({ x, y, id }, index) => (
          <div
            id={id}
            className={styles.point}
            key={index}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              pointerEvents: 'none',
              backgroundColor: colorMapper.point,
            }}
          ></div>
        ))}
        {mouseShape !== 'line' ? (
          <div
            id={this.mouseId}
            style={{
              width: `${mouseRange * 2}px`,
              height: `${mouseRange * 2}px`,
              border: `2px solid ${colorMapper.stroke}`,
            }}
            className={styles[`mouse_${mouseShape}`]}
          ></div>
        ) : null}
        {mouseShape === 'line' ? (
          <svg id={this.svgId} style={{ width: '100%', height: '100%' }}></svg>
        ) : null}
      </div>
    );
  }
}
export default DomPanel;
