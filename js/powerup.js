powerups = [];
let powerupSound = new soundOverlapsClass("audio/powerup");
class Powerup{
	constructor(posX,posY,powerupPic,powerupName){
		this.x = posX;
		this.y = posY;
		this.pic = powerupPic;
		this.name - powerupName
		this.speed = 2;
		this.powerupCaught = false;
		this.useless = false;
	}

	draw(){
		ctx.drawImage(this.pic,this.x,this.y);
	}

	move(){
		let paddleTopEdgeY = PADDLE_Y - PADDLE_GAP;
	    let paddleBottomEdgeY = PADDLE_Y + PADDLE_HEIGHT;
	    let paddleLeftEdgeX = paddle_X;
	    let paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
	    

		if(this.y < canvas.height){

			if( this.y > paddleTopEdgeY  && // below the top of paddle
				this.y < paddleBottomEdgeY && //above the bottom of paddle
		        this.x > paddleLeftEdgeX && // right of the left side of paddle
		        this.x < paddleRightEdgeX) { // left of the left side of paddle
						console.log("Giving you powerup");
						this.powerupCaught = true;
						this.useless = true; 
						powerupSound.play();
						//delete that powerup from powerups array;

		     }
		     if(!this.powerupCaught){
		     	this.y = this.y + this.speed;
				this.draw();
		     }
			
		}

		else{

			this.useless = true;


		}


		

		
	}



}