// Ball Properties
const BALL_COLOR = 'white';
const BALL_DIA = 20;
let ball_XV = -5;
let ball_YV = -5;
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
        // ball_Y += ball_YV;
        // ball_X += ball_XV;

        // if (ball_X > canvas.width || ball_X < 0){
        //     ball_XV = -ball_XV;
        // } 

        // if (ball_Y < 0 ) {
        //     ball_YV = -ball_YV;
        // }

        // if (ball_Y + BALL_DIA/2> canvas.height - PADDLE_HEIGHT - 10 && ball_Y < canvas.height) {
        //     if (ball_X >= paddle_X && ball_X <= paddle_X + PADDLE_WIDTH) {
        //         ball_YV = -ball_YV;
        //     }
        // }

        ballMove();
        // ballBrickHandling();
        ballPaddleHandling();

  }
}

const ballReset=() => {
    ball_XV = -5;
    ball_YV = -5;
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

        // if(bricksLeft == 0) {
            // brickReset();
       // } // out of bricks
    } // ball center inside paddle
} // end of ballPaddleHandling




// function ballBrickHandling() {
//     let ballBrickCol = Math.floor(ball_X / BRICK_WIDTH);
//     let ballBrickRow = Math.floor(ball_Y / BRICK_HEIGHT);
//     let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    
//         if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
//         ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
       
//         if(bricks[brickIndexUnderBall]) {
//             bricks[brickIndexUnderBall] = 0;
//             bricksLeft--;
//             console.log(brickIndexUnderBall);
//                  ball_XV *= -1;
//                 ball_YV *= -1;

//             // let prevBallX = ball_X - ball_XV;
//             // let prevBallY = ball_Y - ball_YV;
//             // let prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH);
//             // let prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT);

//             // let bothTestsFailed = true;

//             // if(prevBrickCol != ballBrickCol) {
//             //     if(isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
//             //         ball_XV *= -1;
//             //         bothTestsFailed = false;
//             //     }
//             // }
//             // if(prevBrickRow != ballBrickRow) {
//             //     if(isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
//             //         ball_YV *= -1;
//             //         bothTestsFailed = false;
//             //     }
//             // }

//             // if(bothTestsFailed) { // armpit case, prevents ball from going through
//             //     ball_XV *= -1;
//             //     ball_YV *= -1;
//             // }

//         } // end of brick found
//     } // end of valid col and row
// } // end of ballBrickHandling func

// const checkBrickBallCollision = ({ x, y }) => {
//     const brickBox = {
//         x: x + BRICK_WIDTH / 2,
//         y: y + BRICK_HEIGHT / 2,
//         width: BRICK_WIDTH,
//         height: BRICK_HEIGHT
//     };

//     const ballBox = {
//         x: ball_X,
//         y: ball_Y,
//         width: BALL_DIA,
//         height: BALL_DIA
//     };

//     return testCollisionRect(brickBox, ballBox);
// };

// const testCollisionRect = (rect1, rect2) => {
//     return (
//         rect1.x <= rect2.x + rect2.width &&
//         rect2.x <= rect1.x + rect1.width &&
//         rect1.y <= rect2.y + rect2.height &&
//         rect2.y <= rect1.y + rect1.height
//     );
// };