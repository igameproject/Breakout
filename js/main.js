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
    //debug 
    // addEventListener('keydown', (evt) => {
    //    if(evt.key == 'n'){
    //    		level++;
    //       if(level >= levels.length){
    //         level = 0;
    //       }
    //    		bricks = levels[level].slice();
    //    }

    //    if(evt.key == 'm'){
    //      multiBall = !multiBall;
    //    }
    //     if(evt.key == 'c'){
    //      cannon = !cannon;
    //    }
    // });
    loadImages();
};

const loadingDoneSoStartGame = () => {
	  // these next few lines set up our game logic and render to happen 30 times per second
	    const FRAMES_PER_SECOND = 50;
      setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
       for(let i = 0; i < balls.length; i++ ){
             setInterval(balls[i].speedIncrement(0.03), 1000)
        }
       
     ;

};


