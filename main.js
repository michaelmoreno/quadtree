import { Point, Rectangle, Quadtree } from './quadtree.js'

const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
const sizer = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}; sizer();
window.addEventListener('resize', sizer())
document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;'

function init() {
  let boundary = new Rectangle(10, 10, canvas.width - 20, canvas.height - 20, 'top', 'green');
  let qt = new Quadtree(boundary, 1);
  console.log(qt);
  boundary.draw(ctx);
  for (let i = 0; i < 30; i++) {
    let p = new Point(Math.random() * canvas.width, Math.random() * canvas.height);
    p.draw();
    qt.insert(p);
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

init();

export {
  ctx,
}