import { setupSettings } from '../../assets/js/utils.js';

const main = document.querySelector('main');
const container = main.querySelector('.container-center');
const ball = main.querySelector('.ball');

let speed = 2;
let direction = 1;
let range = 250;
let x = -range;

let equations = [
    (x) => x,
    (x) => Math.sin(x / 20) * 100,
    (x) => Math.pow(x / 12, 2) - range,
    (x) => -Math.pow(x / 40, 3)
]
let f;

const render = () => {
    x += (speed * direction);
    let y = f(x);
    console.log(y);
    ball.style.transform = `translate3d(${innerWidth < range * 2 ? x / 2 : x}px,${y}px,0)`;
    if ((x >= range && direction > 0) || (x <= -range && direction < 0)) direction *= -1;
    requestAnimationFrame(render);
}

setupSettings((name, value) => {
    switch (name) {
        case 'equation':
            f = equations[value];
            break;
        case 'origin':
            value ? container.classList.add('pivot-c') : container.classList.remove('pivot-c');
            break;
        case 'speed':
            speed = parseFloat(value);
            break;
        case 'range':
            range = parseFloat(value);
            break;
    }
});
render();