let canvas = document.getElementById("mainGame");
let ctx =  canvas.getContext('2d'); 


//Paddle Properties
const PADDLE_WIDTH = 95;
const PADDLE_HEIGHT = 15;
let paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT - 10;;
const PADDLE_XV = 18;
let score = 0;

//Ball Properties
const BALL_DIA = 20;
let ball_XV = -5;
let ball_YV = -5;
let ball_Y = PADDLE_Y - BALL_DIA/2 ;
let ball_X = paddle_X + PADDLE_WIDTH/2;

let gameOver = false; 
let status;
//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 25;
//const MARGIN = 20X and 15Y -> Never used 
let coordinates = [{x : 30 , y : 30 },
                   {x : 110 , y : 30 },
                   {x : 190 , y : 30 },
                   {x : 270 , y : 30 },
                   {x : 350 , y : 30 },
                   {x : 430 , y : 30 },
                   {x : 510 , y : 30 },
                   {x : 30 , y : 70 },
                   {x : 110 , y : 70 },
                   {x : 190 , y : 70 },
                   {x : 270 , y : 70 },
                   {x : 350 , y : 70 },
                   {x : 430 , y : 70 },
                   {x : 510 , y : 70 },
                   {x : 30 , y : 110 },
                   {x : 110 , y : 110 },
                   {x : 190 , y : 110 },
                   {x : 270 , y : 110 },
                   {x : 350 , y : 110 },
                   {x : 430 , y : 110 },
                   {x : 510 , y : 110 },
                   {x : 30 , y : 150 },
                   {x : 110 , y : 150 },
                   {x : 190 , y : 150 },
                   {x : 270 , y : 150 },
                   {x : 350 , y : 150 },
                   {x : 430 , y : 150 },
                   {x : 510 , y : 150 }
];


var heldKeys = {}

let movingLeft = false;
let movingRight = false;



function moveRight() {
  if(paddle_X + PADDLE_WIDTH  < canvas.width){
    paddle_X += PADDLE_XV;
  }
  else{
    movingRight = false;
  }
}

function moveLeft() {
  if(paddle_X  > 0){
    paddle_X -= PADDLE_XV;
  }
  else{
    movingLeft = false;
  }  
}



window.onload = () => {

  document.addEventListener('keydown',function(evt){
    if(evt.code === "ArrowLeft"){
        movingLeft = true;  
    }        
    else if(evt.code === "ArrowRight"){
        movingRight = true;
    }
  });

  document.addEventListener('keyup',function(evt) {
    if(evt.code === 'ArrowLeft'){
      movingLeft = false;
    }
    else if(evt.code === 'ArrowRight'){
      movingRight = false;
    }
  });


  document.addEventListener('mousedown',function(evt){
    // if( ball_XV == 0 && ball_YV == 0){
    //    ball_XV = 5; 
    //     ball_YV = -5;
    // }
    if(gameOver === true){
       gameReset();
    }

  });
  
  let framesPerSecond = 50;
  setInterval(mainGame, 1000/framesPerSecond);


}; //initializing function


let mainGame = () => {

  if(!gameOver){
      if(movingLeft === true ){
        moveLeft();
      }
      else if(movingRight === true)
      {
        moveRight();
      }
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(paddle_X, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
      ctx.fillStyle = "#1eddff";
      //bricks display
      coordinates.forEach((elem, index) => {
        if(checkBrickBallCollision(elem)){
          coordinates.splice(index,1);
          ball_XV = ball_XV; 
          ball_YV = -ball_YV;   
        }
        else
          ctx.fillRect(elem.x,elem.y,BRICK_WIDTH,BRICK_HEIGHT);
      });
      if(coordinates.length === 0){
        status = "You have Won"; 
        gameOver = true;
      }

      ctx.fillStyle = "white";
      updateBallPosition(); 
      ctx.beginPath();
      ctx.arc(ball_X,ball_Y,BALL_DIA/2,0,Math.PI*2);
      ctx.fill();
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

let gameReset = () => {
    coordinates = [{x : 30 , y : 30 },
                  {x : 110 , y : 30 },
                  {x : 190 , y : 30 },
                  {x : 270 , y : 30 },
                  {x : 350 , y : 30 },
                  {x : 430 , y : 30 },
                  {x : 510 , y : 30 },
                  {x : 30 , y : 70 },
                  {x : 110 , y : 70 },
                  {x : 190 , y : 70 },
                  {x : 270 , y : 70 },
                  {x : 350 , y : 70 },
                  {x : 430 , y : 70 },
                  {x : 510 , y : 70 },
                  {x : 30 , y : 110 },
                  {x : 110 , y : 110 },
                  {x : 190 , y : 110 },
                  {x : 270 , y : 110 },
                  {x : 350 , y : 110 },
                  {x : 430 , y : 110 },
                  {x : 510 , y : 110 },
                  {x : 30 , y : 150 },
                  {x : 110 , y : 150 },
                  {x : 190 , y : 150 },
                  {x : 270 , y : 150 },
                  {x : 350 , y : 150 },
                  {x : 430 , y : 150 },
                  {x : 510 , y : 150 }];
    paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
    ball_XV = -5;
    ball_YV = -5;
    ball_Y = PADDLE_Y - BALL_DIA/2 ;
    ball_X = paddle_X + PADDLE_WIDTH/2;
    gameOver = false;

} //gameReset




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

  if(ball_X > canvas.width || ball_X < 0){
    ball_XV = -ball_XV;
  } 

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
        gameOver = true;
        status = "You are Dead";
  }
};

let checkBrickBallCollision = (brick) => {
  let brickBox = {
    x:brick.x + BRICK_WIDTH/2,
    y:brick.y + BRICK_HEIGHT/2,
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,

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

