const canvas = document.getElementById('mainGame');
const ctx = canvas.getContext('2d');

// Lives
let numLives = 3;
let gameOver = false; 
let status;
let score = 0;

window.onload = () => {
    addHoldKeyListener('ArrowLeft');
    addHoldKeyListener('ArrowRight');

    addEventListener('mousedown', () => {
        if (gameOver == true) gameOverReset();
    });

    const FRAMES_PER_SECOND = 50;
    setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
};


const lifeLossReset = () => {
    ballReset();
    gameOver = false;
    ballplayerconnect = true;     
}; //gameReset


const gameOverReset = () => {
    // coordinates = [...INITIAL_COORDINATES];
    paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
    lifeLossReset();
    numLives = 3;
};




