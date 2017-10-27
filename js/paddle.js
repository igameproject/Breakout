// Paddle Properties
const PADDLE_WIDTH = 95;
const PADDLE_HEIGHT = 15;
const PADDLE_XV = 10;
const PADDLE_GAP = 10;
const PADDLE_Y = canvas.height - PADDLE_HEIGHT - PADDLE_GAP;
let paddle_X = canvas.width / 2 - PADDLE_WIDTH / 2;

const updatePaddlePosition = () => {
    if (heldKeys['ArrowLeft'] && paddle_X > 0) {
        paddle_X -= PADDLE_XV;
    }

    if (heldKeys['ArrowRight'] && paddle_X + PADDLE_WIDTH < canvas.width) {
        paddle_X += PADDLE_XV;
    }
};
