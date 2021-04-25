import { Point, Rectangle, Quadtree } from './quadtree.js'

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
const sizer = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}; sizer();
window.addEventListener('resize', sizer())
document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;'

let boundary = new Rectangle(10, 10, canvas.width - 20, canvas.height - 20, 'top', 'green');
let qt = new Quadtree(boundary, 1);
boundary.draw(ctx);
function init() {
  // for (let i = 0; i < 200; i++) {
  //   let p = new Point(Math.random() * canvas.width, Math.random() * canvas.height);
  //   p.draw();
  //   qt.insert(p);
  // }
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
window.addEventListener('mouseup', () => mouseDown = false)

let points = [];
function render() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (mouseDownAndMove) {
    console.log('pressed');
    let p = new Point(mouseX, mouseY);
    qt.insert(p);
  }
  qt.render();
  
  requestAnimationFrame(render);
}

init();
render();

export {
  ctx,
}