import { ctx } from './main.js'

class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }
}

class Rectangle {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  contains(point) {
    return (
      (point.x > this.x && point.x < this.x+this.w) && 
      (point.y > this.y && point.y < this.y + this.h)
    )
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y)
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();
  }
}

class Quadtree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  subdivide() {
    const { x, y, w, h } = this.boundary,
      halfWidth = w/2,
      halfHeight = h/2;
      
    let neBoundary = new Rectangle(x + halfWidth, y, halfWidth, halfHeight);
    this.northeast = new Quadtree(neBoundary, this.capacity)
    
    let seBoundary = new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight);
    this.southeast = new Quadtree(seBoundary, this.capacity);

    
    let swBoundary = new Rectangle(x, y + halfHeight, halfWidth, halfHeight)
    this.southwest = new Quadtree(swBoundary, this.capacity)
    
    let nwBoundary = new Rectangle(x, y, halfWidth, halfHeight)
    this.northwest = new Quadtree(nwBoundary, this.capacity)

    this.divided = true;
  }
  insert(point) {
    if (!this.boundary.contains(point)) {
      return;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      this.northeast.insert(point)
      this.southeast.insert(point)
      this.southwest.insert(point)
      this.northwest.insert(point)
    }
  }
  render() {
    this.boundary.draw();
    this.points.forEach(p => p.draw());
    
    if (this.divided) {
      this.northeast.render();
      this.southeast.render();
      this.southwest.render();
      this.northwest.render();
    }
  }
}


export {
  Point,
  Rectangle,
  Quadtree
}