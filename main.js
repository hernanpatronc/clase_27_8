const player = document.querySelector('#player')
const life = document.querySelector('#life')

const PLAYER_HEIGHT = 20;
const PLAYER_WIDTH = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 500;

let score = 0;

function movePlayer($event) {
    $event.preventDefault();
    if ($event.key == 'ArrowUp') {
        moveUp()
    } else if ($event.key == 'ArrowRight') {
        moveRight()
    } else if ($event.key == 'ArrowDown') {
        moveDown()
    } else if ($event.key == 'ArrowLeft') {
        moveLeft()
    }
    checkLifeObtained()
}

function moveUp() {
    player.style.top = (player.offsetTop - PLAYER_HEIGHT) + 'px';
}
function moveRight() {
    player.style.left = (player.offsetLeft + PLAYER_WIDTH) + 'px';
}
function moveDown() {
    player.style.top = (player.offsetTop + PLAYER_HEIGHT) + 'px';
}
function moveLeft() {
    player.style.left = (player.offsetLeft - PLAYER_WIDTH) + 'px';
}
function checkLifeObtained() {
    if (player.offsetLeft == life.offsetLeft && player.offsetTop == life.offsetTop) {
        moveLife()
        score++;
        document.querySelector('#score').innerHTML = score;
    }
}

function moveLife() {
    const stepsY = GAME_HEIGHT / PLAYER_HEIGHT;
    const stepsX = GAME_WIDTH / PLAYER_WIDTH;

    const newLifeX = Math.floor(Math.random() * stepsX);
    const newLifeY = Math.floor(Math.random() * stepsY);

    life.style.top = (newLifeY * PLAYER_HEIGHT) + 'px';
    life.style.left = (newLifeX * PLAYER_WIDTH) + 'px';
}

moveLife()