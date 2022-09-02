const linear = (x) => {
    return x;
}

const easeInOutQuart = (x) => {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

const easeOutBounce = (x) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= 1.5 / d1) * x + 0.75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= 2.25 / d1) * x + 0.9375;
        } else {
            return n1 * (x -= 2.625 / d1) * x + 0.984375;
        }
    }
    //adicionar um stop, é só adicionar uma prop em fromProps
const tween = (props, duration, toProps) => {
    const ignore = ['ease', 'onUpdate', 'onComplete', 'delay'];
    let entries = Object.entries(toProps).filter(entrie => !ignore.includes(entrie[0]));
    let fromProps = Object.assign({}, props);
    let time;
    //let rate = .01;
    let s = 0;
    s = Math.min(s, 1);
    toProps.ease = toProps.ease ? toProps.ease : linear;
    let start = () => {
        time = Date.now();
        render();
    }
    let render = () => {
        //s += rate;
        s = Math.min((Date.now() - time) / duration, 1);
        entries.forEach(([key, value]) => {
            props[key] = fromProps[key] + (value - fromProps[key]) * toProps.ease(s);
        });
        if (toProps.onUpdate) toProps.onUpdate(props, s);
        if (s < 1) requestAnimationFrame(render);
        else if (toProps.onComplete) toProps.onComplete();
    }
    setTimeout(start, toProps.delay || 0);
}

export { tween, linear, easeInOutQuart, easeOutBounce }