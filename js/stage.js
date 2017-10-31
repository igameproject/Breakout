//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file


const BRICK_COLOR = '#1eddff';
const BRICK_HEIGHT = 27;
const BRICK_WIDTH = 81 ;

// const BRICK_HEIGHT = 16 ;
// const BRICK_WIDTH = 48 ;

const BRICK_GAP = 2;
const BRICK_COLS = 16;
const BRICK_ROWS = 12;




let level = 0 ;
let  bricks = levels[level].slice();

const countBricks = () => {
    let brickCount = 0;
    for(var i=0;i<bricks.length;i++){
        if(bricks[i]) brickCount++;
    }
    return brickCount;
}



// let bricksLeft = levelBricksCount[level]
let bricksLeft = countBricks();




const mainGame = () => {
    if(!gameOver) {
        // colorRect(0, 0, canvas.width, canvas.height,BG_COLOR);
        ctx.drawImage(skyPic, 0, 0);
        drawBricks();
        updatePaddlePosition();
        // colorRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,PADDLE_COLOR);
        ctx.drawImage(paddlePic, paddle_X, PADDLE_Y);


        updateBallPosition();
        // drawBall(ball_X,ball_Y, BALL_DIA / 2, BALL_COLOR);
        ctx.drawImage(ballPic, ball_X - BALL_DIA / 2, ball_Y - BALL_DIA / 2);
        // colorText('Lives : ' + numLives,canvas.width - 20,30,"white",'16px Arial',"right");

        let lifePicOffset = 0
        for(var i = 0; i < numLives ; i++){

            ctx.drawImage(lifePic, canvas.width - 50 - lifePicOffset , 15);
            lifePicOffset += 30;


        }

        colorText('Score : ' + score ,20,30,"white",'16px Arial');
        colorText('Level : ' + (level + 1 ) ,canvas.width/2,30,"white",'16px Arial','center');


    }
    else {
        // colorRect(0, 0, canvas.width, canvas.height,BRICK_COLOR);
        ctx.drawImage(skyPic, 0, 0);
        colorText(status,canvas.width/2,canvas.height/3,"white",'60px Arial','center');
        colorText("Final Score : " + score,canvas.width/2, canvas.height/2 - 50,"white",'25px Arial','center');
        colorText("(Click) to play again",canvas.width/2, canvas.height/2,"white",'20px Arial','center');
    }


}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}


function drawBricks() {

    var brickLeftEdgeX = 0;
    var brickTopEdgeY = 0;

    for(var eachRow=0;eachRow<BRICK_ROWS;eachRow++) {

        brickLeftEdgeX = 0;

        for(var eachCol=0;eachCol<BRICK_COLS;eachCol++) {


            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);


            if(bricks[arrayIndex] == 1) {
                // colorRect(BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow ,BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'cyan');
                ctx.drawImage(brick1Pic, brickLeftEdgeX, brickTopEdgeY);
            }

            if(bricks[arrayIndex] == 2) {
                // colorRect(BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow ,BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'cyan');
                ctx.drawImage(brick2Pic, brickLeftEdgeX, brickTopEdgeY);
            }

            if(bricks[arrayIndex] == 3) {
                // colorRect(BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow ,BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'cyan');
                ctx.drawImage(brick3Pic, brickLeftEdgeX, brickTopEdgeY);
            }

            if(bricks[arrayIndex] == 4) {
                // colorRect(BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow ,BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'cyan');
                ctx.drawImage(cannonPowerupPic, brickLeftEdgeX, brickTopEdgeY);
            }


            brickLeftEdgeX += BRICK_WIDTH;
        }

        brickTopEdgeY += BRICK_HEIGHT;


    }
};



function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
         var brickIndexUnderCoord = rowColToArrayIndex(col, row);
         return bricks[brickIndexUnderCoord];
    } else {
        return false;
    }
}

const lifeLossReset = () => {
    ballReset();
    gameOver = false;
    ballplayerconnect = true;
}; //gameReset


const gameOverReset = () => {
    initializeBricks();
    paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
    lifeLossReset();
    numLives = LIVES;
    level = 0;
    score = 0;
};


const goToNextLevel = () => {
    lifeLossReset();
    level++;
    initializeBricks();
    paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;
    numLives = LIVES;
}


const initializeBricks = () => {
    bricks = levels[level].slice();
    bricksLeft = countBricks();
}
