const main = document.querySelector('main');
const ball = main.querySelector('.ball');

let angle = 0;
let delta = .05;
let maxR = 75;

let d = 0;
let deltaD = .01;

const render = () => {
    angle += delta;
    d += deltaD;
    let r = maxR + (maxR * Math.cos(d));
    let x = r * Math.cos(angle);
    let y = r * Math.sin(angle);
    ball.style.transform = `translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(render);
}

render();