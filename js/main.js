const canvas = document.getElementById('mainGame');
const ctx = canvas.getContext('2d');

// Lives
const LIVES = 1;
let numLives = LIVES;
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


