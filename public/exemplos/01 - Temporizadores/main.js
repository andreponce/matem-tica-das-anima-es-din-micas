class BallAnimator {
    constructor(ball) {
        this.ball = ball;
        this.x = 0;
        this.speed = 5;
        this.time = 1000 / 60;
        this.maxX = parseFloat(ball.getAttribute('maxX'));
        this.yoyo = Boolean(ball.getAttribute('yoyo'));

        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    update() {
        if (this.x > innerWidth) this.x = -this.ball.clientWidth;
        this.x += this.speed;
        this.x = this.maxX && this.x > this.maxX ? this.maxX : this.x;
        this.ball.style.transform = `translate3d(${this.x}px,0,0)`;
        if (this.yoyo && (this.x == this.maxX || this.x == 0)) this.speed *= -1;
        else if (this.maxX && this.x == this.maxX) this.stop();
    }

    start() {
        this.stop();
        this.running = true;
        this.update();
    }

    stop() {
        this.running = false;
    }
}

class SetIntervalAnimator extends BallAnimator {
    start() {
        super.start();
        this.timer = setInterval(this.update, this.time);
    }

    stop() {
        super.stop();
        clearInterval(this.timer);
    }
}

class SetTimeoutAnimator extends BallAnimator {
    update() {
        super.update();
        if (this.running) this.timer = setTimeout(this.update, this.time);
    }

    stop() {
        super.stop();
        clearTimeout(this.timer);
    }
}

class RequestAnimationFrameAnimator extends BallAnimator {
    update() {
        super.update();
        if (this.running) this.timer = requestAnimationFrame(this.update);
    }

    stop() {
        super.stop();
        cancelAnimationFrame(this.timer);
    }
}

const balls = document.querySelectorAll('.ball');
balls.forEach((ball) => {
    let renderType = ball.getAttribute('renderType');
    let h3 = ball.parentElement.querySelector('h3');
    let animator;
    switch (renderType) {
        case '1':
            h3.innerHTML = "setInterval()";
            animator = new SetIntervalAnimator(ball);
            break;
        case '2':
            h3.innerHTML = "setTimeout()";
            animator = new SetTimeoutAnimator(ball);
            break;
        case '3':
            h3.innerHTML = "requestAnimationFrame()";
            animator = new RequestAnimationFrameAnimator(ball);
            break;
    }
    animator.start();
});