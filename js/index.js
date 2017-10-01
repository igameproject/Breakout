let canvas = document.getElementById("mainGame");
let ctx =  canvas.getContext('2d'); 
let initialize = true;
//Paddle Properties
const PADDLE_WIDTH = 95;
const PADDLE_HEIGHT = 15;
console.log(canvas.width)
let paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT - 10;;
const PADDLE_XV = 10;
let score = 0;
let game = ''
//Ball Properties
const BALL_DIA = 20;
let ball_XV = -5;
let ball_YV = -5;
let ball_Y = PADDLE_Y - BALL_DIA/2 ;
let ball_X = paddle_X + PADDLE_WIDTH/2;



// Lives
let numLives = 3;

let gameOver = false; 
let status;
//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file

//const MARGIN = 20X and 15Y -> Never used 


var heldKeys = {}

var addHoldKeyListener = (keyname) => {

  document.addEventListener('keydown',function(evt){
      if(evt.code === keyname){
        heldKeys[keyname] = true;
      }
  });

  document.addEventListener('keyup',function(evt){
      if(evt.code === keyname){
        heldKeys[keyname] = false;   
      }
  });
}

window.onload = () => {

  addHoldKeyListener('ArrowLeft')
  addHoldKeyListener('ArrowRight')
  
  document.addEventListener('mousedown',function(evt){
    // if( ball_XV == 0 && ball_YV == 0){
    //    ball_XV = 5; 
    //     ball_YV = -5;
    // }
    if(gameOver == true){
       gameOverReset();
    }

  });
  
  let framesPerSecond = 50;
  setInterval(mainGame, 1000/framesPerSecond);





}; //initializing function


let mainGame = () => {

  if (initialize){
    initialize = false;
    game = initializeGame()
  }


  if(!gameOver){



      updatePaddlePosition();



      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillStyle = "#1eddff";
      //bricks display
      let levelBrickWidth = game.levels[game.level].brick_width
      let levelBrickHeight = game.levels[game.level].brick_height
      game.levels[game.level].coordinates.forEach((elem, index) => {
        if(checkBrickBallCollision(elem, levelBrickHeight, levelBrickWidth)){
          game.levels[game.level].coordinates.splice(index,1);
          ball_XV = ball_XV; 
          ball_YV = -ball_YV;   
        }
        else
          ctx.fillRect(elem.x,elem.y,levelBrickWidth,levelBrickHeight);
      });

    if(game.levels[game.level].coordinates.length === 0){
      game.level ++
      resetBall()
      if (game.level >= game.levels.length){
        status = "You have Won";
        gameOver = true;
      }
    }

      ctx.fillStyle = "white";
      updateBallPosition();
      ctx.font="16px Arial";
      ctx.fillText("Level " + (game.level+1), 10 , 20); // set type on paddle
      ctx.beginPath();
      ctx.arc(ball_X,ball_Y,BALL_DIA/2,0,Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font="16px Arial";
      ctx.fillText("Lives : " + numLives, paddle_X + (PADDLE_WIDTH/6) , PADDLE_Y + PADDLE_HEIGHT - 2); // set type on paddle
  }

  else {
      ctx.fillStyle = "#1eddff";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "black";
      ctx.font="60px Arial";
      ctx.fillText(status,112,150);
      ctx.fillStyle = "#474747";
      ctx.font="20px Arial";
      ctx.fillText("Click to Play Again", canvas.width/2  - 100,250);
  }
} //main game

// reset game with previous info
let lifeLossReset = () => {
  paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
  ball_XV = -5;
  ball_YV = -5;
  ball_Y = PADDLE_Y - BALL_DIA/2 ;
  ball_X = paddle_X + PADDLE_WIDTH/2;
  gameOver = false;  
}

let gameOverReset = () => {

    paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
    ball_XV = -5;
    ball_YV = -5;
    ball_Y = PADDLE_Y - BALL_DIA/2 ;
    ball_X = paddle_X + PADDLE_WIDTH/2;
    gameOver = false;
    numLives=3;
    initialize = true;
    initializeGame()

} //gameOverReset


let updatePaddlePosition = () => {

  if (heldKeys['ArrowLeft'] && paddle_X > 0){
    paddle_X -= PADDLE_XV;  
  }

  if (heldKeys['ArrowRight'] && paddle_X + PADDLE_WIDTH < canvas.width){
    paddle_X += PADDLE_XV;  
  }
}

let updateBallPosition = () => {
  ball_Y += ball_YV;
  ball_X += ball_XV;

  if(ball_X > canvas.width || ball_X < 0)
    ball_XV = -ball_XV; 

  if(ball_Y < 0){
    ball_YV = -ball_YV;
  }

  if(ball_Y > canvas.height - PADDLE_HEIGHT -10 && ball_Y < canvas.height){
        if(ball_X >= paddle_X && ball_X <= paddle_X + PADDLE_WIDTH ){
            ball_YV = -ball_YV;
        }
        //touches left half of paddle
        // if(ball_X > paddle_X && ball_X < PADDLE_WIDTH/2 ){
        //   ball_XV = -5; 
        //   ball_YV = -ball_YV;
        // }
        // if(ball_X < paddle_X + PADDLE_WIDTH && ball_X > PADDLE_WIDTH/2 ){
        //   ball_XV = 5; 
        //   ball_YV = -ball_YV;
        // }
        // if(ball_X > PADDLE_WIDTH - 5 && ball_X < PADDLE_WIDTH + 5 ){
        //   ball_XV = 0; 
        //   ball_YV = -ball_YV;
        // }
  }

  if(ball_Y > canvas.height){
        // ball_Y = PADDLE_Y - BALL_DIA/2 ;
        // ball_X = paddle_X + PADDLE_WIDTH/2;
        // ball_XV = 0; 
        // ball_YV = 0;
        if(numLives > 1){
          numLives--;
          lifeLossReset();
          // reset game 
        }else{
          gameOver = true;
          status = "You are Dead";
        }
  }
}

let checkBrickBallCollision = (brick, height, width) => {
  let brickBox = {
    x:brick.x + width/2,
    y:brick.y + height/2,
    width: width,
    height: height,

  }
  let ballBox={
    x:ball_X,
    y:ball_Y,
    width:BALL_DIA,
    height:BALL_DIA
  }
  return testCollisionRect(brickBox,ballBox);
};

let testCollisionRect = (rect1,rect2) => {
return rect1.x <= rect2.x + rect2.width
  && rect2.x <= rect1.x + rect1.width
  && rect1.y <= rect2.y + rect2.height
  && rect2.y <= rect1.y + rect1.height;
};

function initializeGame(){
  let game = {
    level: 0,
    levels: getBrickCoordinates(),
  }

  return game
}

function getBrickCoordinates(level){

  let levels = [
    {
      coordinates: [
        {x: 30, y: 30},
        {x: 110, y: 30},
        {x: 190, y: 30},
        {x: 270, y: 30},
        {x: 350, y: 30},
        {x: 430, y: 30},
        {x: 510, y: 30},
        {x: 30, y: 70},
        {x: 110, y: 70},
        {x: 190, y: 70},
        {x: 270, y: 70},
        {x: 350, y: 70},
        {x: 430, y: 70},
        {x: 510, y: 70},
        {x: 30, y: 110},
        {x: 110, y: 110},
        {x: 190, y: 110},
        {x: 270, y: 110},
        {x: 350, y: 110},
        {x: 430, y: 110},
        {x: 510, y: 110},
        {x: 30, y: 150},
        {x: 110, y: 150},
        {x: 190, y: 150},
        {x: 270, y: 150},
        {x: 350, y: 150},
        {x: 430, y: 150},
        {x: 510, y: 150}
      ],
       brick_width: 60,
       brick_height: 25
    },
    {
      brick_width: 40,
      brick_height: 30,
      coordinates: buildLevel(30, 40, 10, 10),
    },
    {
      brick_width: 25,
      brick_height: 25,
      coordinates: buildLevel(25, 25, 5, 5),
    }

  ]

  return levels

}

function resetBall(){
  ball_Y = PADDLE_Y - BALL_DIA/2 ;
  ball_X = paddle_X + PADDLE_WIDTH/2;
}

function buildLevel(height, width, hSpace, vSpace){
  let level = [];
  let blockFloor = 225;

  let endPos = Math.floor(canvas.width / (width+hSpace))*(width+hSpace);
  if (endPos == canvas.width){
    endPos = canvas.width-width-hSpace;
  }

  let startPos = ((canvas.width-endPos)/2);

  for (let i = startPos; i <= endPos; i+=width+hSpace){
    for(let j = 30; j <= blockFloor; j+=height+vSpace){
      level.push({
        x: i,
        y: j
      });
    }
  }

  return level
}
