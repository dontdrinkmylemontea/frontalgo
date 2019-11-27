const nodeContainer = 3;

/**
 * 获取两点之间的距离
 * @param {Point} point1 点1
 * @param {Point} point2 点2
 */
function getDistance(point1, point2) {
  return Math.sqrt(
    (point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y),
  );
}

export class QuadTree {
  constructor(point, length) {
    this.basePoint = point;
    this.sideLen = length;
    this.points = [];
    this.divided = false;
  }

  /**
   * 判断目标点是否在四叉树区域内
   * @param {Point} point 目标点
   */
  isInside(point) {
    return (
      point.x >= this.basePoint.x &&
      point.x <= this.basePoint.x + this.sideLen &&
      point.y >= this.basePoint.y &&
      point.y <= this.basePoint.y + this.sideLen
    );
  }

  /**
   * 将四叉树分割成4个小四叉树
   */
  divideTree() {
    this.divided = true;
    const point = this.basePoint;
    const length = this.sideLen;
    this.northWest = new QuadTree(point, length / 2);
    this.northEast = new QuadTree(new Point(point.x + length / 2, point.y), length / 2);
    this.southEest = new QuadTree(
      new Point(point.x + length / 2, point.y + length / 2),
      length / 2,
    );
    this.southWest = new QuadTree(new Point(point.x, point.y + length / 2), length / 2);
  }

  /**
   * 向四叉树插入一个点
   * @param {Point} point 点
   */
  addPoint(point) {
    if (!this.isInside(point)) {
      return false;
    }
    if (!this.divided && this.points.length < nodeContainer) {
      return this.points.push(point);
    } else if (!this.divided && this.points.length === nodeContainer) {
      this.divideTree();
    }
    this.northWest.addPoint(point);
    this.northEast.addPoint(point);
    this.southEest.addPoint(point);
    this.southWest.addPoint(point);
  }

  /**
   * 该圆形是否与本四叉树有重合区域
   * @param {Point} center 圆心
   * @param {Number} radius 半径
   */
  isCoverCircle(center, radius) {
    const middlePoint = new Point(
      this.basePoint.x + this.sideLen / 2,
      this.basePoint.y + this.sideLen / 2,
    );
    const distance = getDistance(center, middlePoint);
    return distance <= (Math.sqrt(2) * this.sideLen) / 2 + radius;
  }

  /**
   * 获取圆形区域内的所有点
   * @param {Point} center 圆心
   * @param {Number} radius 半径
   */
  getPointsByCircle(center, radius) {
    if (!this.isCoverCircle(center, radius)) return [];
    function inCircleRange(point) {
      return getDistance(center, point) <= radius;
    }
    let points = this.points.filter(p => inCircleRange(p));
    if (this.divided) {
      points = points.concat(this.northWest.getPointsByCircle(center, radius));
      points = points.concat(this.northEast.getPointsByCircle(center, radius));
      points = points.concat(this.southEest.getPointsByCircle(center, radius));
      points = points.concat(this.southWest.getPointsByCircle(center, radius));
    }
    return points;
  }

  /**
   * 该四边形是否与本四叉树有重合区域
   * @param {Point} rectanglePoint 四边形的左下角点
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  isCoverRectangle(rectanglePoint, width, height) {
    const point = this.basePoint;
    const length = this.sideLen;
    return (
      point.x + length > rectanglePoint.x &&
      rectanglePoint.x + width > point.x &&
      point.y + length > rectanglePoint.y &&
      rectanglePoint.y + height > point.y
    );
  }

  /**
   * 获取四边形区域内所有的点
   * @param {Point} rectanglePoint 四边形的左下角点
   * @param {Number} width 宽
   * @param {Number} height 高
   */
  getPointsByRectangle(rectanglePoint, width, height) {
    if (!this.isCoverRectangle(rectanglePoint, width, height)) return [];
    function inRectangleRange(point) {
      return (
        point.x >= rectanglePoint.x &&
        point.x <= rectanglePoint.x + width &&
        point.y >= rectanglePoint.y &&
        point.y <= rectanglePoint.y + height
      );
    }
    const points = this.points.filter(p => inRectangleRange(p));
    if (this.divided) {
      points.concat(this.northWest.getPointsByRectangle(rectanglePoint, width, height));
      points.concat(this.northEast.getPointsByRectangle(rectanglePoint, width, height));
      points.concat(this.southEest.getPointsByRectangle(rectanglePoint, width, height));
      points.concat(this.southWest.getPointsByRectangle(rectanglePoint, width, height));
    }
    return points;
  }
}

let pointId = 0;

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.id = `point-${pointId}`;
    pointId += 1;
  }
}
