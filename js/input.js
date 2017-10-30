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

        if(ballplayerconnect){
              // Change Speed of ball according to motion.
              if(heldKeys['ArrowLeft'] == true){
                ball_XV = -INITIAL_BALL_XV ;
              }
              else if(heldKeys['ArrowRight'] == true){
                ball_XV = INITIAL_BALL_XV ;
              }
              else{
                ball_YV = -INITIAL_BALL_YV ;
              }
            }
         
    });
};

const mouseClickHandle = () => {
    if (gameOver){
      gameOverReset();
    }
    
    else {
      if(ballplayerconnect){
        ballplayerconnect = false;
      }
    }  
}
