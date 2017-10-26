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
        ball_Y += ball_YV;
        ball_X += ball_XV;

        if (ball_X > canvas.width || ball_X < 0){
            ball_XV = -ball_XV;
        } 

        if (ball_Y < 0) {
            ball_YV = -ball_YV;
        }

        if (ball_Y + BALL_DIA/2> canvas.height - PADDLE_HEIGHT - 10 && ball_Y < canvas.height) {
            if (ball_X >= paddle_X && ball_X <= paddle_X + PADDLE_WIDTH) {
                ball_YV = -ball_YV;
            }
        }

        if(ball_Y > canvas.height){
            if(numLives > 1){
              numLives--;
              lifeLossReset();
    		      ballplayerconnect = true;
              // reset game 
            }
            else{
              gameOver = true;
              status = "You are Dead";
            }
        }
  }
}

const checkBrickBallCollision = ({ x, y }) => {
    const brickBox = {
        x: x + BRICK_WIDTH / 2,
        y: y + BRICK_HEIGHT / 2,
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT
    };

    const ballBox = {
        x: ball_X,
        y: ball_Y,
        width: BALL_DIA,
        height: BALL_DIA
    };

    return testCollisionRect(brickBox, ballBox);
};

const testCollisionRect = (rect1, rect2) => {
    return (
        rect1.x <= rect2.x + rect2.width &&
        rect2.x <= rect1.x + rect1.width &&
        rect1.y <= rect2.y + rect2.height &&
        rect2.y <= rect1.y + rect1.height
    );
};