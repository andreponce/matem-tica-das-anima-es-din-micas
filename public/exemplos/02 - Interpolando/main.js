import { main, getPoint, addEventListeners } from '../../assets/js/utils.js';

const ball = document.querySelector('.ball');

let ease = .05;
let cursorX, cursorY;

const render = () => {
    // if (!isNaN(cursorX)) {
        let rect = ball.getBoundingClientRect();
        let x = rect.x;
        let y = rect.y;

        if(x<800) x+=5;
        if(y<800) y+=5;
        // x += (800 - x) * ease;
        // y += (800 - y) * ease;
        // x += (cursorX - x) * ease;
        // y += (cursorY - y) * ease;

        ball.style.transform = `translate3d(${x}px,${y}px,0)`;
    // }

    requestAnimationFrame(render);
}

// const moveHandler = (e) => {
//     let point = getPoint(e);
//     cursorX = point.x - ball.clientWidth * .5;
//     cursorY = point.y - ball.clientHeight * .5;
//     e.preventDefault();
// }

// addEventListeners(main, 'mousemove touchmove', moveHandler);
// render();
setTimeout(render, 1000);