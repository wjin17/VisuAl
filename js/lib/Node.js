// Node class grid is populated with
class Node {
  constructor(row, col) {
    this.col = col;
    this.row = row;
    this.isStart;
    this.isFinish;
    this.isWall = false;
    this.isVisited = false;
    this.previousNode = null;
    // dijkstra
    this.distance = Infinity;
    // a*
    this.g = Infinity;
    this.h = Infinity;
    this.f = this.g + this.h;
  }
}
