//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BG_COLOR = 'black';
const PADDLE_COLOR = '#cecece'

const BRICK_COLOR = '#1eddff';
const BRICK_HEIGHT = 30;
const BRICK_WIDTH = 80;
const BRICK_GAP = 5;
const BRICK_COLS = 15;
const BRICK_ROWS = 5;
const OUTER_PADDING = 52;

let level = 1;

let  bricks = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
               1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
               ];
let bricksLeft = bricks.length;
// let coordinates = [...INITIAL_COORDINATES];

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
                colorRect(BRICK_WIDTH*eachCol + OUTER_PADDING,BRICK_HEIGHT*eachRow + OUTER_PADDING,
                    BRICK_WIDTH-BRICK_GAP,BRICK_HEIGHT-BRICK_GAP, 'blue');
            } // end of is this brick here
        } // end of for each brick
    } // end of for each row

}; // end of drawBricks func

function isBrickAtColRow(col, row) {
    if(col >= 0 && col < BRICK_COLS &&
        row >= 0 && row < BRICK_ROWS) {
         var brickIndexUnderCoord = rowColToArrayIndex(col, row);
         return bricks[brickIndexUnderCoord];
    } else {
        return false;
    }
}

// const INITIAL_COORDINATES = [
//     { x: 30, y: 30 },
//     { x: 110, y: 30 },
//     { x: 190, y: 30 },
//     { x: 270, y: 30 },
//     { x: 350, y: 30 },
//     { x: 430, y: 30 },
//     { x: 510, y: 30 },
//     { x: 30, y: 70 },
//     { x: 110, y: 70 },
//     { x: 190, y: 70 },
//     { x: 270, y: 70 },
//     { x: 350, y: 70 },
//     { x: 430, y: 70 },
//     { x: 510, y: 70 },
//     { x: 30, y: 110 },
//     { x: 110, y: 110 },
//     { x: 190, y: 110 },
//     { x: 270, y: 110 },
//     { x: 350, y: 110 },
//     { x: 430, y: 110 },
//     { x: 510, y: 110 },
//     { x: 30, y: 150 },
//     { x: 110, y: 150 },
//     { x: 190, y: 150 },
//     { x: 270, y: 150 },
//     { x: 350, y: 150 },
//     { x: 430, y: 150 },
//     { x: 510, y: 150 }
// ];

// const mainGame = () => {
//     if (!gameOver) {
//         updatePaddlePosition();
//         colorRect(0, 0, canvas.width, canvas.height,BG_COLOR);
//         colorRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT,BALL_COLOR);

//         // Bricks display
//         // coordinates.map((elem, index) => {
//         //     if (checkBrickBallCollision(elem)) {
//         //         coordinates.splice(index, 1);
//         //         ball_XV = ball_XV;
//         //         ball_YV = -ball_YV;
//         //     } else {
//         //         colorRect(elem.x, elem.y, BRICK_WIDTH, BRICK_HEIGHT,BRICK_COLOR);
//         //     }
//         // });

//         if (coordinates.length === 0) {
//             status = 'You have Won';
//             gameOver = true;
//         }


//         updateBallPosition();
//         drawBall(ball_X,ball_Y, BALL_DIA / 2, BALL_COLOR);

//         colorText('Lives : ' + numLives,
//             paddle_X + PADDLE_WIDTH / 6,
//             PADDLE_Y + PADDLE_HEIGHT - 2,
//             BG_COLOR,
//             '16px Arial');

//     } else {
        
//         colorRect(0, 0, canvas.width, canvas.height,BRICK_COLOR);
//         ctx.save();
//         ctx.textAlign="center"; 
//         colorText(status,canvas.width/2,canvas.height/3,BG_COLOR,'60px Arial');
//         colorText("Click to play again",canvas.width/2, canvas.height/2,'#474747','20px Arial');
//         ctx.restore();
//     }
// };

// // Reset game with previous info
