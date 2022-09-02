import { main, getPoint, addEventListeners } from '../../assets/js/utils.js';

const ball = main.querySelector('.ball');

const MIN_RADIUS = 1; //em
const MAX_RADIUS = 20;
const DISTANCE = 250;

const reset = () => {
    ball.removeAttribute('style');
}

const moveHandler = (e) => {
    let cursorPoint = getPoint(e);

    /*let bouding = ball.getBoundingClientRect();
    let difX = Math.round(cursorPoint.x - (bouding.x + bouding.width * .5));
    let difY = Math.round(cursorPoint.y - (bouding.y + bouding.height * .5));
    let distance = Math.hypot(difX, difY);
    console.log(distance);*/

    let bouding = ball.getBoundingClientRect();
    let difX = Math.round(cursorPoint.x - (bouding.x + bouding.width * .5));
    let difY = Math.round(cursorPoint.y - (bouding.y + bouding.height * .5));
    let distance = Math.hypot(difX, difY);
    let percent = Math.max(0, DISTANCE - distance) / DISTANCE;
    let radius = Math.max(MAX_RADIUS * percent, MIN_RADIUS);

    ball.style.width = `${radius}em`;
    ball.style.height = `${radius}em`;

    e.preventDefault();
}

const touchstartHandler = (e) => {
    moveHandler(e);
}

addEventListeners(main, 'mousemove touchmove', moveHandler);
addEventListeners(main, 'touchstart', touchstartHandler);
addEventListeners(main, 'touchend', reset);