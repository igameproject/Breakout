// Ball Properties
const BALL_COLOR = 'white';
const BALL_DIA = 20;
const INITIAL_BALL_XV = -5;
const INITIAL_BALL_YV = -5;

let ball_XV = INITIAL_BALL_XV;
let ball_YV = INITIAL_BALL_YV;
let ball_Y = PADDLE_Y - BALL_DIA / 2;
let ball_X = paddle_X + PADDLE_WIDTH / 2;
//ball connected to player paddle
let ballplayerconnect = true;



const updateBallPosition = () => {
    if(ballplayerconnect){
      ball_Y = PADDLE_Y - 10;
      ball_X = paddle_X + (PADDLE_WIDTH/2);
    } 
    else {
        ballMove();
        ballBrickHandling();
        ballPaddleHandling();
  }
}

const ballReset=() => {
    ball_XV = INITIAL_BALL_XV; ;
    ball_YV = INITIAL_BALL_YV ;
    ball_Y = PADDLE_Y - BALL_DIA / 2;
    ball_X = paddle_X + PADDLE_WIDTH / 2;
}


const ballMove = () => {
    ball_X += ball_XV;
    ball_Y += ball_YV;

    if(ball_X < 0 && ball_XV < 0.0) { //left
        ball_XV *= -1;
    }

    if(ball_X > canvas.width && ball_XV > 0.0) { // right
        ball_XV *= -1;
    }

    if(ball_Y < 0 && ball_YV < 0.0) { // top
        ball_YV *= -1;
    }

    if(ball_Y > canvas.height) { // bottom
        if(numLives > 1){
            numLives--;
            lifeLossReset();
        }
        else{
            gameOver = true;
            status = "You are Dead";
        }
    }
}

const ballPaddleHandling = () => {
    let paddleTopEdgeY = PADDLE_Y - PADDLE_GAP;
    let paddleBottomEdgeY = PADDLE_Y + PADDLE_HEIGHT;
    let paddleLeftEdgeX = paddle_X;
    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    if( ball_Y > paddleTopEdgeY  && // below the top of paddle
        ball_Y < paddleBottomEdgeY && // above bottom of paddle
        ball_X > paddleLeftEdgeX && // right of the left side of paddle
        ball_X < paddleRightEdgeX) { // left of the left side of paddle

        ball_YV *= -1;

        let centerOfPaddleX = paddle_X + PADDLE_WIDTH/2;
        let ballDistFromPaddleCenterX = ball_X - centerOfPaddleX;
        ball_XV = ballDistFromPaddleCenterX * 0.3;
        ballSpeedIncrement(0.06);

    } // ball center inside paddle
} // end of ballPaddleHandling




function ballBrickHandling() {
    let ballBrickCol = Math.floor(ball_X / (BRICK_WIDTH )) ;
    let ballBrickRow = Math.floor(ball_Y / (BRICK_HEIGHT )) ;
    
    
    if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
        let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
        if(bricks[brickIndexUnderBall]) {
            bricks[brickIndexUnderBall] = 0;
            bricksLeft--;
            score += 20;
            ballSpeedIncrement(0.06);

            if(bricksLeft == 0) {
                goToNextLevel();
           } // out of bricks

            let prevBallX = ball_X - ball_XV;
            let prevBallY = ball_Y - ball_YV;
            let prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH);
            let prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT);

            let bothTestsFailed = true;

            if(prevBrickCol != ballBrickCol) {
                if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
                    ball_XV *= -1;
                    bothTestsFailed = false;
                }
            }
            if(prevBrickRow != ballBrickRow) {
                if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
                    ball_YV *= -1;
                    bothTestsFailed = false;
                }
            }

            if(bothTestsFailed) { // armpit case, prevents ball from going through
                ball_XV *= -1;
                ball_YV *= -1;
            }

        } // end of brick found
    } // end of valid col and row
} // end of ballBrickHandling func

const ballSpeedIncrement = (inc) => {

    if(!ballplayerconnect){

        if(ball_XV < 0){
        ball_XV -= inc;
        }

        if( ball_XV >= 0){
            ball_XV += inc;
        }

        if( ball_YV < 0){
            ball_YV -= inc;
        }

        if( ball_YV >= 0){
            ball_YV += inc;
        }

    }
    
}
