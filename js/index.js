const canvas = document.getElementById('mainGame');
const ctx = canvas.getContext('2d');
const BG_COLOR = 'black';

// Paddle Properties
const PADDLE_WIDTH = 95;
const PADDLE_HEIGHT = 15;
const PADDLE_XV = 10;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT - 10;
let paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
let score = 0;

// Ball Properties
const BALL_COLOR = 'white';
const BALL_DIA = 20;
let ball_XV = -5;
let ball_YV = -5;
let ball_Y = PADDLE_Y - BALL_DIA / 2;
let ball_X = paddle_X + PADDLE_WIDTH / 2;

// Lives
let numLives = 3;
let gameOver = false;
let status;

//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BRICK_COLOR = '#1eddff';
const BRICK_HEIGHT = 25;
const BRICK_WIDTH = 60;

const INITIAL_COORDINATES = [
    { x: 30, y: 30 },
    { x: 110, y: 30 },
    { x: 190, y: 30 },
    { x: 270, y: 30 },
    { x: 350, y: 30 },
    { x: 430, y: 30 },
    { x: 510, y: 30 },
    { x: 30, y: 70 },
    { x: 110, y: 70 },
    { x: 190, y: 70 },
    { x: 270, y: 70 },
    { x: 350, y: 70 },
    { x: 430, y: 70 },
    { x: 510, y: 70 },
    { x: 30, y: 110 },
    { x: 110, y: 110 },
    { x: 190, y: 110 },
    { x: 270, y: 110 },
    { x: 350, y: 110 },
    { x: 430, y: 110 },
    { x: 510, y: 110 },
    { x: 30, y: 150 },
    { x: 110, y: 150 },
    { x: 190, y: 150 },
    { x: 270, y: 150 },
    { x: 350, y: 150 },
    { x: 430, y: 150 },
    { x: 510, y: 150 }
];

let coordinates = [...INITIAL_COORDINATES];

const heldKeys = {};

const addHoldKeyListener = keyname => {
    addEventListener('keydown', ({ code }) => {
        if (code === keyname) {
            heldKeys[keyname] = true;
        }
    });

    addEventListener('keyup', ({ code }) => {
        if (code === keyname) {
            heldKeys[keyname] = false;
        }
    });
};

window.onload = () => {
    addHoldKeyListener('ArrowLeft');
    addHoldKeyListener('ArrowRight');

    addEventListener('mousedown', () => {
        if (gameOver == true) gameOverReset();
    });

    const FRAMES_PER_SECOND = 50;
    setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
};

const mainGame = () => {
    if (!gameOver) {
        updatePaddlePosition();
        ctx.fillStyle = BG_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BALL_COLOR;
        ctx.fillRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillStyle = BRICK_COLOR;

        // Bricks display
        coordinates.map((elem, index) => {
            if (checkBrickBallCollision(elem)) {
                coordinates.splice(index, 1);
                ball_XV = ball_XV;
                ball_YV = -ball_YV;
            } else {
                ctx.fillRect(elem.x, elem.y, BRICK_WIDTH, BRICK_HEIGHT);
            }
        });

        if (coordinates.length === 0) {
            status = 'You have Won';
            gameOver = true;
        }

        ctx.fillStyle = BALL_COLOR;
        updateBallPosition();
        ctx.beginPath();
        ctx.arc(ball_X, ball_Y, BALL_DIA / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = BG_COLOR;
        ctx.font = '16px Arial';
        ctx.fillText(
            'Lives : ' + numLives,
            paddle_X + PADDLE_WIDTH / 6,
            PADDLE_Y + PADDLE_HEIGHT - 2
        );
    } else {
        ctx.fillStyle = BRICK_COLOR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = BG_COLOR;
        ctx.font = '60px Arial';
        ctx.fillText(status, 112, 150);
        ctx.fillStyle = '#474747';
        ctx.font = '20px Arial';
        ctx.fillText('Click to Play Again', canvas.width / 2 - 100, 250);
    }
};

// Reset game with previous info
const lifeLossReset = () => {
    paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
    ball_XV = -5;
    ball_YV = -5;
    ball_Y = PADDLE_Y - BALL_DIA / 2;
    ball_X = paddle_X + PADDLE_WIDTH / 2;
    gameOver = false;
};

const gameOverReset = () => {
    coordinates = [...INITIAL_COORDINATES];
    lifeLossReset();
    numLives = 3;
};

const updatePaddlePosition = () => {
    if (heldKeys['ArrowLeft'] && paddle_X > 0) {
        paddle_X -= PADDLE_XV;
    }

    if (heldKeys['ArrowRight'] && paddle_X + PADDLE_WIDTH < canvas.width) {
        paddle_X += PADDLE_XV;
    }
};

const updateBallPosition = () => {
    ball_Y += ball_YV;
    ball_X += ball_XV;

    if (ball_X > canvas.width || ball_X < 0) ball_XV = -ball_XV;

    if (ball_Y < 0) {
        ball_YV = -ball_YV;
    }

    if (ball_Y > canvas.height - PADDLE_HEIGHT - 10 && ball_Y < canvas.height) {
        if (ball_X >= paddle_X && ball_X <= paddle_X + PADDLE_WIDTH) {
            ball_YV = -ball_YV;
        }
    }

    if (ball_Y > canvas.height) {
        if (numLives > 1) {
            numLives--;
            lifeLossReset();
            // Reset game
        } else {
            gameOver = true;
            status = 'You are Dead';
        }
    }
};

const checkBrickBallCollision = ({ x, y }) => {
    const brickBox = {
        x: x + BRICK_WIDTH / 2,
        y: y + BRICK_HEIGHT / 2,
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT
    };

    const ballBox = {
        x: ball_X,
        y: ball_Y,
        width: BALL_DIA,
        height: BALL_DIA
    };

    return testCollisionRect(brickBox, ballBox);
};

const testCollisionRect = (rect1, rect2) => {
    return (
        rect1.x <= rect2.x + rect2.width &&
        rect2.x <= rect1.x + rect1.width &&
        rect1.y <= rect2.y + rect2.height &&
        rect2.y <= rect1.y + rect1.height
    );
};