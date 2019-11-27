import React, { Component } from 'react';
import { Point, QuadTree } from './QuadTree';
import styles from './Tree.less';

const background = {
  width: 1200,
  height: 500,
};

const shapeTools = [
  {
    name: '圆形',
    value: 'circle',
  },
  {
    name: '矩形',
    value: 'rectangle',
  },
];

const rangeTooles = [
  {
    name: '圈定范围',
    value: 'mouseRange',
  },
  {
    name: '点个数',
    value: 'starCount',
  },
  {
    name: '树的单节点容量',
    value: 'nodeCapacity',
  },
];

function generatePoints(count, nodeCapacity) {
  const arr = [];
  const quadTree = new QuadTree(new Point(0, 0), background.width, nodeCapacity);
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
      starCount: 1,
      mouseRange: 50,
      nodeCapacity: 4,
    };
    this.quadTree = undefined;
    this.prevPoints = [];
  }

  componentDidMount() {
    this.resetTree();
  }

  componentWillUnmount() {
    this.removeListener();
  }

  resetTree = () => {
    const { starCount, nodeCapacity } = this.state;
    const { arr, quadTree } = generatePoints(starCount, nodeCapacity);
    this.setState({
      points: arr,
    });
    this.quadTree = quadTree;
  };

  mouseMoveHandler = ({ layerX: x, layerY: y }) => {
    const { mouseRange } = this.state;
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

  toggleShape = value => {
    console.log('value = ', value);
  };

  changeRangeValue = ({ charCode, currentTarget: { value } }, name) => {
    if (charCode !== 13) return;
    this.setState(
      {
        [name]: Number(value),
      },
      this.resetTree,
    );
  };

  render() {
    const { points, mouseRange } = this.state;
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
          <div className={styles.toolbox}>
            {shapeTools.map(({ name, value }) => (
              <div className={styles.toolItem} onClick={() => this.toggleShape(value)} key={value}>
                <span>{name}</span>
              </div>
            ))}
          </div>
          <div className={styles.toolbox}>
            {rangeTooles.map(({ name, value }) => (
              <div className={styles.toolItem} style={{ cursor: 'default' }} key={value}>
                {name}：
                <input
                  defaultValue={this.state[value]}
                  onKeyPress={e => this.changeRangeValue(e, value)}
                  onPaste={() => false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Tree;
