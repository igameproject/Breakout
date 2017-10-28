//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BG_COLOR = 'black';
const PADDLE_COLOR = '#cecece'

const BRICK_COLOR = '#1eddff';
const BRICK_HEIGHT = 30;
const BRICK_WIDTH = 81.25 ;
const BRICK_GAP = 2;
const BRICK_COLS = 16;
const BRICK_ROWS = 9;
const OUTER_PADDING = 52;

let level = 1;

let  bricks = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

               ];
let bricksLeft = bricks.length;


const mainGame = () => {
    if(!gameOver) {
        updatePaddlePosition();
        colorRect(0, 0, canvas.width, canvas.height,BG_COLOR);
        colorRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,PADDLE_COLOR);
        updateBallPosition();
        drawBall(ball_X,ball_Y, BALL_DIA / 2, BALL_COLOR);
        colorText('Lives : ' + numLives,canvas.width - 20,30,BALL_COLOR,'16px Arial',"right");
        colorText('Score : ' + score ,20,30,BALL_COLOR,'16px Arial');
        colorText('Level : ' + level ,canvas.width/2,30,BALL_COLOR,'16px Arial','center');

        //draw bricks
        drawBricks();

    }
    else {
        colorRect(0, 0, canvas.width, canvas.height,BRICK_COLOR);
        colorText(status,canvas.width/2,canvas.height/3,BG_COLOR,'60px Arial','center');
        colorText("Click to play again",canvas.width/2, canvas.height/2,'#474747','20px Arial','center');

    }


}

function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
}

function drawBricks() {

    for(var eachRow=0;eachRow<BRICK_ROWS;eachRow++) {
        
        for(var eachCol=0;eachCol<BRICK_COLS;eachCol++) {

            var arrayIndex = rowColToArrayIndex(eachCol, eachRow);


            if(bricks[arrayIndex]) {
                colorRect(BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow ,
                    BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'blue');
                colorText(eachRow +',' + eachCol,BRICK_WIDTH*eachCol ,BRICK_HEIGHT*eachRow +20,'black','10px Arial')
            } // end of is this brick here
        } // end of for each brick
    } // end of for each row

}; // end of drawBricks func

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS && row >= 0 && row < BRICK_ROWS) {
         var brickIndexUnderCoord = rowColToArrayIndex(col, row);
         return bricks[brickIndexUnderCoord];
    } else {
        return false;
    }
}
