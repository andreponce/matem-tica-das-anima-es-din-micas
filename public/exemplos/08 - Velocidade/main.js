import { main, getPoint, addEventListeners } from '../../assets/js/utils.js';

const speedometer = document.querySelector('.speedometer');
let pointer, textSpeed;

let lastCursorPoint, cursorPoint;
const MS = 100;
const DT = (1000 / MS);
const MAX_SPEED = 5000;
const MAX_ANGLE = 262;

const windowOutHandler = (e) => {
    lastCursorPoint = null;
}

const moveHandler = (e) => {
    cursorPoint = getPoint(e);
    if (e.type == "touchstart") lastCursorPoint = cursorPoint;
    e.preventDefault();
}

const render = () => {
    if (lastCursorPoint) {
        let h = Math.hypot(cursorPoint.y - lastCursorPoint.y, cursorPoint.x - lastCursorPoint.x);
        let speed = Math.min(Math.round(h * DT), MAX_SPEED);
        let angle = (speed / MAX_SPEED) * MAX_ANGLE;

        textSpeed.textContent = speed;
        pointer.style.transform = `rotate(${angle}deg)`;
    }
    lastCursorPoint = cursorPoint;

    setTimeout(render, MS);
}

const setup = () => {
    let svg = speedometer.contentDocument.documentElement;
    pointer = svg.querySelector('#pointer');
    textSpeed = svg.querySelector('#text-speed');

    addEventListeners(main, 'mousemove touchmove touchstart', moveHandler);
    addEventListeners(main, 'mouseout touchend', windowOutHandler);

    render();
}

speedometer.addEventListener('load', setup);