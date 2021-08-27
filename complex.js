const player = document.querySelector('#player')
const life = document.querySelector('#life')

const PLAYER_HEIGHT = 20;
const PLAYER_WIDTH = 20;
const STEP_X = 20;
const STEP_Y = 20;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 500;

let score = 0;
let direction = 'right'

function movePlayer($event) {
    $event.preventDefault();
    if ($event.key == 'ArrowUp') {
        direction = 'up'
    } else if ($event.key == 'ArrowRight') {
        direction = 'right'
    } else if ($event.key == 'ArrowDown') {
        direction = 'down'
    } else if ($event.key == 'ArrowLeft') {
        direction = 'left'
    }
}

function moveUp() {
    player.style.top = (player.offsetTop - STEP_Y) + 'px';
}
function moveRight() {
    player.style.left = (player.offsetLeft + STEP_X) + 'px';
}
function moveDown() {
    player.style.top = (player.offsetTop + STEP_Y) + 'px';
}
function moveLeft() {
    player.style.left = (player.offsetLeft - STEP_X) + 'px';
}
function wait(milliseconds) {
    return new Promise(res=>setTimeout(res,milliseconds))
}
let finishTime = Date.now() + 60000;
async function move() {
    
    await wait(50)

    if (direction == 'up') {
        moveUp()
    } else if (direction == 'right') {
        moveRight()
    } else if (direction == 'down') {
        moveDown()
    } else if (direction == 'left') {
        moveLeft()
    }
    checkLifeObtained()
    checkOutOfBounds()
    const timeLeft = finishTime - Date.now();
    if (timeLeft > 0) {
        document.querySelector('#time').innerHTML = Math.floor(timeLeft / 1000) + '.' + (timeLeft % 1000);
        requestAnimationFrame(move)
    } else {
        document.querySelector('#time').innerHTML = '0.000';
        document.querySelector('.game-over').style.opacity = 1;
        document.querySelector('#result').innerHTML = "You did " + score + ' points';
    }
}
requestAnimationFrame(move)

function checkOutOfBounds() {
    if (player.offsetTop < 0) {
        player.style.top = GAME_HEIGHT - PLAYER_HEIGHT + 'px'
    } else if (player.offsetLeft + PLAYER_WIDTH >= GAME_WIDTH) {
        player.style.left = '0px'
    } else if (player.offsetTop + PLAYER_HEIGHT >= GAME_HEIGHT) {
        player.style.top = '0px'
    } else if (player.offsetLeft < 0) {
        player.style.left = GAME_WIDTH - PLAYER_WIDTH + 'px'
    }
}

function checkLifeObtained() {
    if (player.offsetLeft + PLAYER_WIDTH > life.offsetLeft
        && player.offsetLeft < life.offsetLeft + PLAYER_WIDTH
        && player.offsetTop + PLAYER_WIDTH > life.offsetTop
        && player.offsetTop < life.offsetTop + PLAYER_HEIGHT) {
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