const canvas = document.getElementById('mainGame');
const ctx = canvas.getContext('2d');

// Lives
const LIVES = 3;
let numLives = LIVES;
let gameOver = false; 
let status;
let score = 0;


window.onload = () => {
    addHoldKeyListener('ArrowLeft');
    addHoldKeyListener('ArrowRight');
    addEventListener('mousedown', mouseClickHandle);
    //debug levels
    addEventListener('keydown', (evt) => {
       if(evt.key == 'n'){
       		level++;
       		bricks = levels[level].slice();
       }
    });
    loadImages();
};

const loadingDoneSoStartGame = () => {
	  // these next few lines set up our game logic and render to happen 30 times per second
	    const FRAMES_PER_SECOND = 50;
      setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
      setInterval(ball.ballSpeedIncrement(0.03), 1000);

};


