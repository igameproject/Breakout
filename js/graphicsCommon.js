function colorRect(topLeftX,topLeftY,boxWidth,boxHeight,fillColor) {
	ctx.fillStyle = fillColor;
	ctx.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function drawBall(centerX,centerY,radius,fillColor) {
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(centerX,centerY,10,0,Math.PI*2,true);
	ctx.fill();
}

function colorText(showWords,textX,textY,fillColor,fontface,textAlign = 'left' ) {
	ctx.textAlign = textAlign;
	ctx.font = fontface;
	ctx.fillStyle = fillColor;
	ctx.fillText(showWords, textX, textY);
}