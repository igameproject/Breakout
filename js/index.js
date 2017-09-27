var  canvas = document.getElementById("mainGame");
var ctx =  canvas.getContext('2d'); 


//Paddle Properties
const PADDLE_WIDTH = 95;
const PADDLE_HEIGHT = 15;
var paddle_X = canvas.width/2 - PADDLE_WIDTH/2;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT - 10;;
const PADDLE_XV = 30;
var score = 0;

//Ball Properties
const BALL_DIA = 20;
var ball_XV = 5;
var ball_YV = -5;
var ball_Y = PADDLE_Y - BALL_DIA/2 ;
var ball_X = paddle_X + PADDLE_WIDTH/2;

//Bricks
//These will be set of coordinates which will be displayed via loop
//Different levels can be loaded based on this map which will be stored in different file
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 25;
//const MARGIN = 20X and 15Y -> Never used 
var coordinates = [{x : 30 , y : 30 },
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



window.onload = () => {

  document.addEventListener('keydown',function(evt){
      if(evt.code == "ArrowLeft"){
        if(paddle_X - 10 > 0){
          paddle_X -= PADDLE_XV;  
        }
              
      }
      if(evt.code == "ArrowRight"){
        if(paddle_X + PADDLE_WIDTH + 10 < canvas.width){
          paddle_X += PADDLE_XV; 
        }
      }
  });


  document.addEventListener('mousedown',function(evt){
    if( ball_XV == 0 && ball_YV == 0){
       ball_XV = 5; 
        ball_YV = -5;
    }
  });
  
  var framesPerSecond = 60;
  setInterval(mainGame,1000/framesPerSecond);


}; //initializing function


var mainGame = () => {

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white"
  ctx.fillRect(paddle_X,PADDLE_Y,PADDLE_WIDTH,PADDLE_HEIGHT);

  ctx.fillStyle = "#1eddff"
  //bricks display
  coordinates.forEach(function(elem){
    ctx.fillRect(elem.x,elem.y,BRICK_WIDTH,BRICK_HEIGHT);
  })
  
  ctx.fillStyle = "white"
  updateBallPosition(); 
  ctx.beginPath();
  ctx.arc(ball_X,ball_Y,BALL_DIA/2,0,Math.PI*2);
  ctx.fill();



} //main game


var updateBallPosition = () =>{

  ball_Y += ball_YV;
  ball_X += ball_XV;
  if(ball_X > canvas.width || ball_X < 0)
    ball_XV = -ball_XV; 

  if( ball_Y < 0){
    ball_YV = -ball_YV;
  }

  if(ball_Y > canvas.height - PADDLE_HEIGHT -10 && ball_X > paddle_X && ball_X < paddle_X + PADDLE_WIDTH ){
        
        //touches left half of paddle
        if(ball_X > paddle_X && ball_X < PADDLE_WIDTH/2 ){
          ball_XV = -5; 
          ball_YV = -ball_YV;
        }
        if(ball_X < paddle_X + PADDLE_WIDTH && ball_X > PADDLE_WIDTH/2 ){
          ball_XV = 5; 
          ball_YV = -ball_YV;
        }
        if(ball_X > PADDLE_WIDTH - 5 && ball_X < PADDLE_WIDTH + 5 ){
          ball_XV = 0; 
          ball_YV = -ball_YV;
        }
  }

  if(ball_Y > canvas.height){
     
     
        ball_Y = PADDLE_Y - BALL_DIA/2 ;
        ball_X = paddle_X + PADDLE_WIDTH/2;
        ball_XV = 0; 
        ball_YV = 0;
     

  }
}
