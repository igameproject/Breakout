
let bullets = [];

class Bullet{
	
	constructor(){
		this.x = paddle_X + PADDLE_WIDTH/4;
		this.y = PADDLE_Y - CANNON_HEIGHT;
		this.velocityY = 5;
		this.height = 10;
		this.width = 5;
	}

	move(){
		if(this.y > 0 ){
			this.y -= this.velocityY;
		}
		else{
			bullets.pop();
		}
	}

	draw(){
		this.move();
		this.brickHandling();
		colorRect(this.x, this.y, this.width, this.height, 'purple');
	}

	brickHandling(){
        let ballBrickCol = Math.floor(this.x / (BRICK_WIDTH )) ;
        let ballBrickRow = Math.floor(this.y / (BRICK_HEIGHT )) ;
        
        
        if(ballBrickCol >= 0 && ballBrickCol < BRICK_COLS && ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {
            let brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
            if(bricks[brickIndexUnderBall] != 0) {
                bricks[brickIndexUnderBall] = 0;
                bricksLeft--;
                bullets.pop();
                if(bricksLeft == 0 && numLives > 0) {
                    goToNextLevel();
                } // out of bricks
            }
		}
	}

}