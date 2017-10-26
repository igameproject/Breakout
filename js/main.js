const canvas = document.getElementById('mainGame');
const ctx = canvas.getContext('2d');

window.onload = () => {
    addHoldKeyListener('ArrowLeft');
    addHoldKeyListener('ArrowRight');

    addEventListener('mousedown', () => {
        if (gameOver == true) gameOverReset();
    });

    const FRAMES_PER_SECOND = 50;
    setInterval(mainGame, 1000 / FRAMES_PER_SECOND);
};






