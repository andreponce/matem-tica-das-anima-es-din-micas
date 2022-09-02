const main = document.querySelector('main');

const getPoint = (e) => {
    let point = e.changedTouches ? e.changedTouches[0] : e;
    return { x: point.pageX, y: point.pageY };
}

const getCenterPoint = (target) => {
    let bouding = target.getBoundingClientRect();
    return { x: (bouding.x + bouding.width * .5), y: (bouding.y + bouding.height * .5) }
}

const getAngle = (startPont, endPoint) => {
    let difX = Math.round(endPoint.x - startPont.x);
    let difY = Math.round(endPoint.y - startPont.y);
    return Math.atan2(difY, difX);
}

const normalizeAngle = (angle) => {
    let PI2 = (Math.PI * 2);
    angle = angle < 0 ? (Math.PI + angle) + Math.PI : angle;
    angle = angle > PI2 ? angle - PI2 : angle;
    return angle;
}

const isMobileDevice = () => {
    return (typeof window.orientation !== "undefined");
}

const randomizeHexColor = () => {
    return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
}

const createBall = (color, opacity) => {
    let ball = document.createElement('div');
    ball.classList.add('ball', 'transform');
    if (color) ball.style.background = color;
    if (opacity) ball.style.opacity = opacity;
    main.appendChild(ball);
    return ball;
}

const addEventListeners = (target, events, call) => {
    events.split(" ").forEach(event => {
        target.addEventListener(event, call);
    });
}

const removeEventListeners = (target, events, call) => {
    events.split(" ").forEach(event => {
        target.removeEventListener(event, call);
    });
}

const setupSettings = (callback) => {
    const settings = main.querySelector('.settings');
    const action = settings.querySelector('.action');
    const inputs = settings.querySelectorAll('input');

    let tools = {};

    inputs.forEach(el => {
        let type = el.type;
        let name = el.name;
        if (type == 'range') {
            let output = settings.querySelector(`output[for=${el.id}]`);
            output.value = el.value;
            el.addEventListener('input', function() {
                output.value = this.value;
                callback(name, parseFloat(this.value));
            });
            el.addEventListener('change', function() {
                output.value = this.value;
            });
        } else {
            if (type == 'button') el.addEventListener('click', () => callback(name, el.value));
            else {
                el.addEventListener('change', function() {
                    let value = type == 'checkbox' ? el.checked : el.value;
                    callback(name, value);
                });
            }
        }
        if ((type == 'radio' && el.checked) || (type != 'radio' && type != 'button')) callback(name, type == 'checkbox' ? el.checked : parseFloat(el.value));

        tools[name] = el;
    });

    if (action) {
        action.addEventListener('click', () => {
            settings.classList.toggle('show');
        });
        main.addEventListener('click', () => {
            settings.classList.remove('show');
        });
        settings.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    return tools;
}

export {
    main,
    getPoint,
    getCenterPoint,
    getAngle,
    normalizeAngle,
    isMobileDevice,
    createBall,
    randomizeHexColor,
    addEventListeners,
    removeEventListeners,
    setupSettings
}