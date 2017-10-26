//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BG_COLOR = 'black';

// Lives
let numLives = 3;
let gameOver = false; 
let status;

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

const mainGame = () => {
    if (!gameOver) {
        updatePaddlePosition();
        colorRect(0, 0, canvas.width, canvas.height,BG_COLOR);
        colorRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,BALL_COLOR);

        // Bricks display
        coordinates.map((elem, index) => {
            if (checkBrickBallCollision(elem)) {
                coordinates.splice(index, 1);
                ball_XV = ball_XV;
                ball_YV = -ball_YV;
            } else {
                colorRect(elem.x, elem.y, BRICK_WIDTH, BRICK_HEIGHT,BRICK_COLOR);
            }
        });

        if (coordinates.length === 0) {
            status = 'You have Won';
            gameOver = true;
        }


        updateBallPosition();
        drawBall(ball_X,ball_Y, BALL_DIA / 2, BALL_COLOR);

        colorText('Lives : ' + numLives,
            paddle_X + PADDLE_WIDTH / 6,
            PADDLE_Y + PADDLE_HEIGHT - 2,
            BG_COLOR,
            '16px Arial');

    } else {
        
        colorRect(0, 0, canvas.width, canvas.height,BRICK_COLOR);
        colorText(status,112,150,BG_COLOR,'60px Arial')
        colorText(status,canvas.width / 2 - 100, 250,'#474747','20px Arial')
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
    ballplayerconnect = true;     
}; //gameReset


const gameOverReset = () => {
    coordinates = [...INITIAL_COORDINATES];
    lifeLossReset();
    numLives = 3;
};