import { Point, Rectangle, Quadtree, count } from './quadtree.js'

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
const sizer = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}; sizer();
window.addEventListener('resize', sizer())
document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden; background-color: black'

let boundary = new Rectangle(10, 10, canvas.width - 20, canvas.height - 20, 'top', 'green');
let qt = new Quadtree(boundary, 1);
boundary.draw(ctx);
function init() {
  console.log(qt.boundary.x);
  console.log(qt.boundary.x + qt.boundary.w);
  for (let i = 0; i < 100; i++) {
    let p = new Point(Math.random() * ((qt.boundary.x + qt.boundary.w) - qt.boundary.x) + qt.boundary.x, Math.random() * ((qt.boundary.y + qt.boundary.h) - qt.boundary.y) + qt.boundary.y);
    qt.insert(p);
  }
  console.log(qt);
}

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
window.addEventListener('mouseup', function() {
  mouseDown = false;
  mouseDownAndMove = false;
})



let randomX = Math.random() * ((qt.boundary.x + qt.boundary.w) - qt.boundary.x) + qt.boundary.x;
let randomY = Math.random() * ((qt.boundary.y + qt.boundary.h) - qt.boundary.y) + qt.boundary.y;
let range = new Rectangle(randomX, randomY, 400, 375);
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  qt.render();
  if (mouseDownAndMove) {
    range.x = mouseX;
    range.y = mouseY;
    ctx.beginPath();
    ctx.closePath();
    ctx.fillStyle = 'blue',
    ctx.fill();
    
  }
  ctx.beginPath();
  range.draw();
  // ctx.rect(randomX, randomY, 400, 375);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1
  qt.query(range);
  ctx.fillStyle = 'white';
  ctx.font = '25px arial';
  ctx.fillText(qt.query(range)[0].length, range.x-10, range.y-10);
  ctx.closePath();
  
  requestAnimationFrame(render);
}

const grabBread = () => {
  //
}

const makeSandwich = () => {
  grabBread();
}

init();
render();


export {
  ctx,
  count,
}