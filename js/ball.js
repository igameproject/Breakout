// Ball Properties
const BALL_COLOR = 'white';
const BALL_DIA = 20;
const INITIAL_BALL_XV = -5;
const INITIAL_BALL_YV = -5;
let ballplayerconnect = true;
let ballPaddleHitSound = new soundOverlapsClass("audio/hit");
let ballBrickSound = new soundOverlapsClass("audio/brick");
let ballMissSound = new soundOverlapsClass("audio/miss");
let stickyBall = false;
let redBall = false;
let multiBall = false;
let bonusLifeEligible = true;
let balls = [];

class Ball{
    constructor(){
        this.velocityX = INITIAL_BALL_XV ;
        this.velocityY = INITIAL_BALL_YV ;
        this.y = PADDLE_Y - BALL_DIA / 2;
        this.x = paddle_X + PADDLE_WIDTH / 2;
        //ball connected to player paddle
        this.chainBounce = false;
        this.useless = false;        
    }

    updatePosition(){
        if(ballplayerconnect){
          this.y = PADDLE_Y - 10;
          this.x = paddle_X + (PADDLE_WIDTH/2);
        }
        else {
            this.move();
            this.brickHandling();
            this.paddleHandling();
        }
    }

    reset(){
        this.velocityX = INITIAL_BALL_XV; ;
        this.velocityY = INITIAL_BALL_YV ;
        this.y = PADDLE_Y - BALL_DIA / 2;
        this.x = paddle_X + PADDLE_WIDTH / 2;
    }

    move(){
        this.x += this.velocityX;
        this.y += this.velocityY;

        if(this.x < 0 && this.velocityX < 0.0) { //left
            this.velocityX *= -1;
        }

        if(this.x > canvas.width && this.velocityX > 0.0) { // right
            this.velocityX *= -1;
        }

        if(this.y < 0 && this.velocityY < 0.0) { // top
            this.velocityY *= -1;
        }

        if(this.y > canvas.height) { // bottom
            if(numLives > 1){
                if(balls.length == 1){
                    numLives--;
                    ballMissSound.play();
                    lifeLossReset();
                }
                else{
                    this.useless = true;
                }

            }
            else{
                ballMissSound.play();
                gameOver = true;
                status = "You are Dead";
            }

        }
    }


    paddleHandling(){
        let paddleTopEdgeY = PADDLE_Y - PADDLE_GAP;
        let paddleBottomEdgeY = PADDLE_Y + PADDLE_HEIGHT;
        let paddleLeftEdgeX = paddle_X;
        let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
        if( this.y > paddleTopEdgeY  && // below the top of paddle
            this.y < paddleBottomEdgeY && // above bottom of paddle
            this.x > paddleLeftEdgeX && // right of the left side of paddle
            this.x < paddleRightEdgeX) { // left of the left side of paddle

            scoreHandling();

            if(!stickyBall){

                this.velocityY *= -1;
                let centerOfPaddleX = paddle_X + PADDLE_WIDTH/2;
                let ballDistFromPaddleCenterX = this.x - centerOfPaddleX;
                this.velocityX = ballDistFromPaddleCenterX * 0.3;
                this.speedIncrement(0.04);
                this.chainBounce = false;
                ballPaddleHitSound.play();

            }
            else if(stickyBall){
                
                ballplayerconnect = true;
                //Potential bug
                balls[0].reset();

            }


        } // ball center inside paddle
    } // end of ballPaddleHandling

    brickHandling(){
        //have to take into consideration how ball is travelling left to right,r

        let prevBallX = this.x - this.velocityX;
        let prevBallY = this.y - this.velocityY;
        let prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH);
        let prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT);
        let bothTestsFailed = true;

        let ballBrickCol,ballBrickRow;        

        //if ball is coming towards brick from left
        // x,y is center of ball
        if(prevBallX < this.x){
            ballBrickCol = Math.floor((this.x + (BALL_DIA/2)) / BRICK_WIDTH) ;
        }

        //if ball is coming towards brick from right
        if(prevBallX > this.x){
            ballBrickCol = Math.floor((this.x - (BALL_DIA/2)) / BRICK_WIDTH) ;
        }

        //if ball is coming towards brick from top
        if(prevBallY < this.y){
            ballBrickRow = Math.floor((this.y + (BALL_DIA/2)) / BRICK_HEIGHT) ;
        }

        //if ball is coming towards brick from bottom
        if(prevBallY > this.y){
            ballBrickRow = Math.floor((this.y - (BALL_DIA/2)) / BRICK_HEIGHT) ;
            
        }


        if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
            let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
            if(bricks[brickIndexUnderBall] > 0) {
                bricks[brickIndexUnderBall]--;
                if(bricks[brickIndexUnderBall] == 0){
                    bricksLeft--;
                }
                this.chainBounce ? score += 20 : score += 10;
                scoreHandling();
                this.speedIncrement(0.02);
                this.chainBounce = true;
                ballBrickSound.play();
                let random = Math.floor(Math.random() * 20);
                if(random == 0){
                    let decideWhichPowerup = Math.ceil(Math.random() * 6);
                    let powerup;
                    switch(decideWhichPowerup){
                        case 1:
                            powerup = new Powerup(this.x,this.y,cannonPowerupPic,"cannon");
                            break;
                        case 2:
                            powerup = new Powerup(this.x,this.y,extraScorePowerupPic,"extraScore");
                            break;
                        case 3:
                            powerup = new Powerup(this.x,this.y,multiBallPowerupPic,"multiBall");
                            break;
                        case 4:
                            powerup = new Powerup(this.x,this.y,redBallPowerupPic,"redBall");
                            break;
                        case 5:
                            powerup = new Powerup(this.x,this.y,stickyBallPowerupPic,"stickyBall");
                            break;
                        case 6:
                            powerup = new Powerup(this.x,this.y,lifePic,"freeLife");
                            break;                        
                    }
                    powerups.push(powerup);
                    powerup.move();
                    
                }
                if(bricksLeft == 0 && numLives > 0) {
                    goToNextLevel();
                } // out of bricks

               

                if(!redBall){
                    if(prevBrickCol != ballBrickCol) {
                        if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                            this.velocityX *= -1;
                            bothTestsFailed = false;
                        }
                    }
                    if(prevBrickRow != ballBrickRow) {
                        if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                            this.velocityY *= -1;
                            bothTestsFailed = false;
                        }
                    }
                    if(bothTestsFailed) { // armpit case, prevents ball from going through
                            this.velocityX *= -1;
                            this.velocityY *= -1;
                    }
                }
            } // end of brick found
        } // end of valid col and row
    } // end of ballBrickHandling func

    speedIncrement(inc){

        if(!ballplayerconnect){
            if(this.velocityX < 0){
            this.velocityX -= inc;
            }

            if( this.velocityX >= 0){
                this.velocityX += inc;
            }


            if( this.velocityY < 0){
                this.velocityY -= inc;
            }

            if( this.velocityY >= 0){
                this.velocityY += inc;
            }

        }
        
    }
}
