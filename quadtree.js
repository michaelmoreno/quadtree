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
    ctx.font = '15px arial';
    ctx.fillText(`${this.x}, ${this.y}`, this.x-30, this.y+30)
    ctx.closePath();
  }
}

class Rectangle {
  constructor(x,y,w,h, name,color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;
    this.color = color
  }
  contains(point) {
    ctx.beginPath();
    function arcs(x,y,name,color){
      ctx.beginPath();
      ctx.arc(x,y, 10, 0, Math.PI * 2, false)
      ctx.closePath();
      ctx.fillStyle = color
      ctx.fill();
      ctx.font = '15px arial';
      ctx.fillText(`${x}, ${y}`, x-80, y-10)
    }
    arcs(this.x, this.y, this.name, this.color);
    arcs(this.x + this.w, this.y, this.name, this.color)
    arcs(this.x+this.w, this.y+this.h, this.name, this.color)
    ctx.arc(this.x, this.y+this.h, 10, 0, Math.PI * 2, false);
    // ctx.fillStyle = this.color;
    // ctx.fillText(this.name, this.x + this.w-50, this.y+40)
    ctx.closePath()
    ctx.fill();
    console.log(' ');
    console.log(this.name);
    console.log(`point.x ${point.x}`);
    console.log(`this.x: ${this.x}`);
    console.log(`point.x > this.x: ${point.x > this.x}`);
    console.log(`this.x + this.w: ${this.x+this.w}`);
    console.log(`point.x < this.x+this.w: ${point.x < this.x+this.w}`);
    console.log(`point.y: ${point.y}`);
    console.log(`this.y: ${this.y}`);
    console.log(`point.y > this.y: ${point.y > this.y}`);
    console.log(`this.h: ${this.h}`);
    console.log(`point.y < this.y + this.h: ${point.y < this.y + this.h}`);
    return (
      (point.x > this.x && point.x < this.x+this.w) && 
      (point.y > this.y && point.y < this.y + this.h)
    )
    
    // return (point.x < this.x + this.w &&
    //   point.x < this.x + this.w &&
    //   point.y > this.y - this.h &&
    //   point.y < this.y + this.h)
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y, 10,0, Math.PI * 2, false);
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
    this.insertionAttempted = false;
    this.containsPoints = false;
  }
  subdivide() {
    const { x, y, w, h } = this.boundary,
      halfWidth = w/2,
      halfHeight = h/2;
      
    let neBoundary = new Rectangle(x + halfWidth, y, halfWidth, halfHeight, 'northeast');
    this.northeast = new Quadtree(neBoundary, this.capacity)
    this.northeast.boundary.draw();
    
    let seBoundary = new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight, 'southeast', 'red');
    this.southeast = new Quadtree(seBoundary, this.capacity);
    this.southeast.boundary.draw();

    
    let swBoundary = new Rectangle(x, y + halfHeight, halfWidth, halfHeight, 'southwest')
    this.southwest = new Quadtree(swBoundary, this.capacity)
    this.southwest.boundary.draw();
    
    let nwBoundary = new Rectangle(x, y, halfWidth, halfHeight)
    this.northwest = new Quadtree(nwBoundary, this.capacity)
    this.northwest.boundary.draw();

    this.divided = true;
  }
  insert(point) {
    this.insertionAttempted = true;
    if (!this.boundary.contains(point)) {
      return;
    }
    this.containsPoints = true;
    
    if (this.points.length < this.capacity) {
      this.points.push(point)
    } else {
      if (!this.divided) {
        console.log('divide');
        this.subdivide();
      } else {
        console.log('stop dividing');
      }
      this.northeast.insert(point)
      this.southeast.insert(point)
      this.southwest.insert(point)
      this.northwest.insert(point)
    }
  }
}


export {
  Point,
  Rectangle,
  Quadtree
}