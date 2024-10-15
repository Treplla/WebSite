const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
let score = 0;
let isJumping = false;

// Função para pular
function jump() {
    if (isJumping) return; // Impede múltiplos pulos
    isJumping = true;
    dino.style.bottom = '80px';
    setTimeout(() => {
        dino.style.bottom = '0';
        isJumping = false;
    }, 300);
}

// Eventos de teclado e toque
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});
document.addEventListener('touchstart', jump);

// Loop do jogo
const gameLoop = setInterval(() => {
    const cactusPosition = cactus.offsetLeft;
    const dinoPosition = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));

    // Verifica a colisão
    if (cactusPosition < 50 && cactusPosition > 0 && dinoPosition < 30) {
        clearInterval(gameLoop); // Para o loop do jogo
        alert('Game Over! Sua pontuação: ' + score);
        location.reload();
    } else if (cactusPosition < 0) {
        score++;
        scoreDisplay.innerHTML = 'Pontuação: ' + score;

        // Reinicia a posição do cacto
        cactus.style.right = '100%'; 
        cactus.style.animation = 'none'; // Para parar a animação
        setTimeout(() => {
            cactus.style.animation = ''; // Reinicia a animação
            cactus.style.right = '-50px'; // Reseta a posição
        }, 10);
    }
}, 100);
