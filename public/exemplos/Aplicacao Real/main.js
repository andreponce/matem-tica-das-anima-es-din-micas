const items = document.querySelectorAll('.root div');

const screenFactor = .7;

const fy = (y) =>{
    return -Math.pow((y-1), 2)+1;
}

const scrollHandler = ()=>{
    const mHeight = innerHeight*.5;
    const stageHeight = innerHeight*screenFactor;
    items.forEach(el => {
        const style = el.style;
        const rect = el.getBoundingClientRect();
        const y = rect.y+rect.height*.5;
        const yDist = Math.abs(y-mHeight); // distance
        const pct = Math.min(Math.max(Math.abs((yDist / stageHeight) - 1), 0), 1); //percentage
        
        // const scale = pct;//linar
        // const x = pct; // linear
        const scale = fy(pct);
        const x = fy(pct);
        style.setProperty('--s', scale);
        style.setProperty('--x', `${x}em`);
    });
}
document.addEventListener('scroll', scrollHandler);
document.addEventListener('DOMContentLoaded', scrollHandler, {once:true});