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
      (point.x >= this.x && point.x <= this.x+this.w) && 
      (point.y >= this.y && point.y <= this.y + this.h)
    )
  }

  intersects(range) {
    console.log(`range:`);
    console.log(range);
    console.log(`this`);
    console.log(this);
    
    
    ctx.beginPath();
    ctx.arc(range.x, range.y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    return !(
      range.x+range.w < this.x ||
      range.x > this.x+this.w ||
      range.y+range.h < this.y ||
      range.y > this.y+this.h
    );
    // if (
    //   (range.x < this.x+this.w && range.x + range.w > this.x+this.w) ||
    //   (range.x+range.w > this.x && range.x < this.x) ||
    //   (range.y < this.y && range.y+range.h > this.y) ||
    //   (range.y+range.h > this.y && range.y < this.y)); {
    //     console.log('true');
    //   }

    // return (range.x-range.w > this.x+this.w ||
    //   range.x+this.w < this.x-this.w ||
    //   range.y-range.h > this.y+this.h ||
    //   range.y+this.h < this.y-this.h)
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
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast.insert(point)) {
        return true;
      }
      if (this.southeast.insert(point)) {
        return true
      }
      if (this.southwest.insert(point)) {
        return true
      }
      if (this.northwest.insert(point)) {
        return true;
      }
    }
  }

  query(range) {
    let found = ['1'];
    
    if (!this.boundary.intersects(range)) {
      console.log('no');
      return;
    } else {
      console.log('yes');
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        found.concat(this.northeast.query(range));
        found.concat(this.southeast.query(range));
        found.concat(this.southwest.query(range));
        found.concat(this.northwest.query(range));
      }
      return found
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