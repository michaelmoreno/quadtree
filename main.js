import { Point, Rectangle, Quadtree } from './quadtree.js'

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
const sizer = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}; sizer();
window.addEventListener('resize', sizer())
document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;'

// let boundary = new Rectangle(10, 10, canvas.width - 20, canvas.height - 20, 'top', 'green');
// let qt = new Quadtree(boundary, 1);
// boundary.draw(ctx);
// function init() {
//   for (let i = 0; i < 300; i++) {
//     let p = new Point(Math.random() * canvas.width, Math.random() * canvas.height);
//     qt.insert(p);
//   }
//   console.log(qt);
// }

let mouseDown = false;
let mouseDownAndMove = false;
let mouseX;
let mouseY;
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mousemove', function(event) {
  if (mouseDown) {
    mouseX = event.x;
    mouseY = event.y;
    mouseDownAndMove = true;
  }
});
window.addEventListener('mouseup', () => mouseDown = false)

// console.log(qt);
// let points = [];
function render() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // if (mouseDownAndMove) {
  //   console.log('pressed');
  //   let p = new Point(mouseX, mouseY);
  //   qt.insert(p);
  // }
  // qt.render();

  // ctx.beginPath();
  // let range = new Rectangle(250, 250, 207, 175);
  // let points = qt.query(range);
  // console.log(points);
  
  // ctx.rect(range.x, range.y, range.w * 2, range.h*2);
  // ctx.strokeStyle = 'red';
  // ctx.stroke();
  
  requestAnimationFrame(render);
}


let boundary = new Rectangle(canvas.width/2, canvas.height/2, 300, 200)
boundary.draw();

let range = new Rectangle(canvas.width/2+301, canvas.height/2+205, 300, 200);
range.draw();

console.log(boundary.intersects(range));


// init();
// render();

export {
  ctx,
}