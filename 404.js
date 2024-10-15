const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.style.bottom = '80px';
    setTimeout(() => {
        dino.style.bottom = '0';
        isJumping = false;
    }, 300);
}

setInterval(() => {
    const cactusPosition = cactus.offsetLeft;
    const dinoPosition = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

    if (cactusPosition < 50 && cactusPosition > 0 && dinoPosition < 30) {
        alert('Game Over! Sua pontuação: ' + score);
        location.reload();
    } else if (cactusPosition < 0) {
        score++;
        scoreDisplay.innerHTML = 'Pontuação: ' + score;
    }
}, 100);
