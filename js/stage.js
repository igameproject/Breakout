//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file

const BRICK_HEIGHT = 23;
const BRICK_WIDTH = 71 ;
const BRICK_GAP = 2;
const BRICK_COLS = 16;
const BRICK_ROWS = 12;
const CANNON_WIDTH = 15;
const CANNON_HEIGHT = 50;
let cannon = false;
let fireBullets = false;
let level = 0;
let  bricks = levels[level].slice();

balls.push(new Ball())

const countBricks = () => {
    let brickCount = 0;
    for(let i=0;i<bricks.length;i++){
        if(bricks[i]) brickCount++;  
    }
    console.log(brickCount)
    return brickCount;
}

let bricksLeft = countBricks();

const mainGame = () => {

    if(!gameOver) { 
        ctx.drawImage(skyPic, 0, 0);
        drawBricks();
        updatePaddlePosition();
        ctx.drawImage(paddlePic, paddle_X, PADDLE_Y);

        if(multiBall && balls.length == 1){
            let ball1 = new Ball();
            let ball2 = new Ball();            
            balls.push(ball1);
            balls.push(ball2);
            console.log(balls);

            for(let i = 1; i <= 2; i++){
                balls[i].velocityX = balls[0].velocityX  + (Math.ceil(Math.random() * 3) - Math.ceil(Math.random() * 3))
                balls[i].velocityY = balls[0].velocityX  + (Math.ceil(Math.random() * 3) - Math.ceil(Math.random() * 3))
                balls[i].x = balls[0].x;
                balls[i].y = balls[0].y;
            }

            multiBall = false;
        }

        //displaying all balls.
        for(let i = 0; i < balls.length; i++ ){
            if(!balls[i].useless){
                balls[i].updatePosition();
                if(redBall){
                    ctx.drawImage(redBallPic, balls[i].x - BALL_DIA / 2, balls[i].y - BALL_DIA / 2);
                }
                else{
                    ctx.drawImage(ballPic, balls[i].x - BALL_DIA / 2, balls[i].y - BALL_DIA / 2);
                }
            }
            else{
                balls.splice(i,1);
            }            
        }

        //powerup display
        if(powerups.length > 0){

            //draw it.
            for(let i = 0 ;i < powerups.length; i++){
                if(!powerups[i].useless){
                    powerups[i].move();
                }
                else if(powerups[i].useless){
                    powerups.splice(i,1);
                }                
            }
        }

        if(cannon){
            ctx.drawImage(cannonPic, paddle_X + PADDLE_WIDTH/4, PADDLE_Y - CANNON_HEIGHT);
        }

        if(fireBullets && bullets.length < 1){
            bullets.push(new Bullet());
            fireBullets = false;
        }

        if(bullets.length == 1){
            bullets[0].draw();
        }

        let lifePicOffset = 0
        for(let i = 0; i < numLives ; i++){
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


const rowColToArrayIndex = (col, row) => {

    return col + BRICK_COLS* row;

}


const drawBricks = () => {

    let brickLeftEdgeX = 0;
    let brickTopEdgeY = 0;
    for(let eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
        brickLeftEdgeX = 0;
        for(let eachCol=0;eachCol<BRICK_COLS;eachCol++) {
            let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
            if(bricks[arrayIndex] == 1) {
                ctx.drawImage(brick1Pic, brickLeftEdgeX, brickTopEdgeY);               
            } 
            if(bricks[arrayIndex] == 2) {               
                ctx.drawImage(brick2Pic, brickLeftEdgeX, brickTopEdgeY);               
            } 
            if(bricks[arrayIndex] == 3) {                
                ctx.drawImage(brick3Pic, brickLeftEdgeX, brickTopEdgeY);               
            } 
            brickLeftEdgeX += BRICK_WIDTH; 
        } 
        brickTopEdgeY += BRICK_HEIGHT;
    } 

}; 



const isBrickAtColRow = (col, row) => {

    if(col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
         let brickIndexUnderCoord = rowColToArrayIndex(col, row);
         return bricks[brickIndexUnderCoord];
    } else {
        return false;
    }

}

const lifeLossReset = () => {

    balls[0].reset();
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

const scoreHandling = () => {

     if(score>= 10000 && bonusLifeEligible){
        numLives += 1;
        bonusLifeEligible = false;
    }

}




