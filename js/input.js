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

const mouseClickHandle = () => {

    if (gameOver){
      gameOverReset();
    }
    
    else if(ballplayerconnect){
          

          if(heldKeys['ArrowLeft'] == true){
                balls[0].velocityX = INITIAL_BALL_XV ;
              }
              else if(heldKeys['ArrowRight'] == true){
                balls[0].velocityX = -INITIAL_BALL_XV ;
              }

          ballplayerconnect = false;
    }  

    if(cannon){
      fireBullets = true;
    }
}


