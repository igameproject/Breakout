powerups = [];
let powerupSound = new soundOverlapsClass("audio/powerup");

class Powerup{
	constructor(posX,posY,powerupPic,powerupName){
		this.x = posX;
		this.y = posY;
		this.pic = powerupPic;
		this.name = powerupName;
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
						
						this.actionForPowerup();
						this.powerupCaught = true;
						this.useless = true; 
						powerupSound.play();
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

	actionForPowerup(){
		
		if(this.name == "freeLife"){
			numLives++;
		}
		if(this.name == "extraScore"){
			score+=1000;
		}
		if(this.name == "stickyBall"){
			stickyBall = true;

			setTimeout(function(){stickyBall = false;},16000);
		}
		if(this.name == "redBall"){
			redBall = true;
			setTimeout(function(){redBall = false;},16000);
		}
		if(this.name == "cannon"){
			cannon = true;
			setTimeout(function(){cannon = false;},16000);

		}
 		if(this.name == "multiBall"){
			multiBall = true;
			
		}

	}
}

