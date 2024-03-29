import React, { Component } from 'react';
import { Point, QuadTree } from './QuadTree';
import DomPanel from './DomPanel';
import styles from './SearchPanel.less';
import CanvasPanel from './CanvasPanel';

const background = {
  width: 1200,
  height: 500,
};

const colorMapper = {
  background: '#003366',
  point: '#004c99',
  active: '#ffbf00',
  stroke: '#339966',
};

const shapeTools = [
  {
    name: '线条',
    value: 'line',
  },
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

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      starCount: 1000,
      mouseRange: 50,
      nodeCapacity: 4,
      mouseShape: shapeTools[0].value,
    };
    this.quadTree = undefined;
    this.prevPoints = [];
  }

  componentDidMount() {
    this.resetTree();
  }

  resetTree = () => {
    const { starCount, nodeCapacity } = this.state;
    const { arr, quadTree } = generatePoints(starCount, nodeCapacity);
    this.setState({
      points: arr,
    });
    this.quadTree = quadTree;
  };

  toggleShape = value => {
    this.setState({
      mouseShape: value,
    });
  };

  changeRangeValue = ({ charCode, currentTarget: { value } }, name) => {
    if (charCode !== 13) return;
    this.setState(
      {
        [name]: Number(value),
      },
      () => {
        if (name === 'mouseRange') return;
        this.resetTree();
      },
    );
  };

  render() {
    const { points, mouseRange, mouseShape } = this.state;
    const { type } = this.props;
    const Panel = type === 'canvas' ? CanvasPanel : DomPanel;
    return (
      <div
        className={styles.root}
        style={{
          width: `${background.width + 10}px`,
        }}
      >
        <div className={styles.type}>{type}画板</div>
        <Panel
          background={background}
          points={points}
          mouseRange={mouseRange}
          quadTree={this.quadTree}
          mouseShape={mouseShape}
          colorMapper={colorMapper}
        />
        <div className={styles.toolbar}>
          <div className={styles.toolbox}>
            {shapeTools.map(({ name, value }) => (
              <div
                className={`${styles.toolItem} ${value === mouseShape ? styles.active : ''}`}
                onClick={() => this.toggleShape(value)}
                key={value}
              >
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
export default SearchPanel;
