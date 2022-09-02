const main = document.querySelector(".main");
const ball_1 = document.querySelector("#ball-1");
const ball_2 = document.querySelector("#ball-2");

let angle = 0;
let delta = .05;

const render = () => {
    angle += delta;

    let y = (Math.sin(angle) * 100);
    let scale = 1 + (Math.abs(Math.sin(angle)) * 2);

    ball_1.style.transform = `translate3d(0,${y}px,0)`;
    ball_2.style.transform = `scale(${scale})`;

    requestAnimationFrame(render);
}
render();