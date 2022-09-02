const main = document.querySelector('main');
const ball = main.querySelector('.ball');

let angle = 0;
let delta = .05;
// let r = 100;
let a = 100;
let b = 50;

const render = () => {
    angle += delta;
    let x = a * Math.cos(angle);
    let y = b * Math.sin(angle);
    ball.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(render);
}

render();