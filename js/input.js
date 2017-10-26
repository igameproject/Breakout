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
        if(code === "Space"){
            if(ballplayerconnect){
              ballplayerconnect = false;
              if(heldKeys['ArrowLeft'] == true){
                ball_XV = -5;
              }
              else if(heldKeys['ArrowRight'] == true){
                ball_XV = 5;
              }
              else{
                ball_YV = -5;
              }
            }
         }
    });
};
