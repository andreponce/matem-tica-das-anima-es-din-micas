const ball_1 = document.querySelector('#ball-1');
const ball_2 = document.querySelector('#ball-2');

const linear = (x) => {
    return x;
}

const easeInOutQuart = (x) => {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

const animate = (el, position, duration = 1000, ease = linear) => {
    const startTime = Date.now();

    const render = () => {
        const lapsedTime = Date.now() - startTime;
        const pct = Math.min(lapsedTime / duration, 1);
        
        const x = position.x * ease(pct)
        const y = position.y * ease(pct)

        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        // el.style.setProperty('--x', `${x}px`);
        // el.style.setProperty('--y', `${y}px`);

        if(pct<1) requestAnimationFrame(render);
    }
    render();
}

animate(ball_1,{x:500, y:500}, 2000, easeInOutQuart);
animate(ball_2,{x:1000, y:300}, 3000, easeInOutQuart);