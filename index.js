const canvas = document.getElementById('game_area');
const context = canvas.getContext('2d');

let x = 100;
let y = 100;

const CLIMBER_WIDTH = 50; 
const CLIMBER_HEIGHT = 100;

const ROCK_WIDTH = 25;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const DOWN_KEY_CODE = 40;
const UP_KEY_CODE = 38;
const LEFT_KEY_CODE = 37;
const RIGHT_KEY_CODE = 39;

let moveSpeed = 2;
let rockSpeed = 1;
let rockwallSpeed = 0.5;

count = 0

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;

const rocks = [];

const imgClimber = new Image();
imgClimber.onload = function () {
    drawGame();
}
imgClimber.src = 'sprites/testClimber.png';

const imgRock = new Image();
imgRock.onload = function () {
    drawGame();
}
imgRock.src = 'sprites/testRock.png';

const imgRockwall = new Image();
imgRockwall.onload = function () {
    drawGame();
}
imgRockwall.src = 'sprites/testRockwall.png';

const rockwall = {
    x: 0,
    y: -800,
    flip: false
}

function drawGame() {
    requestAnimationFrame(drawGame);
    clearScreen();
    spawnRocks();
    inputs();
    moveRocks();
    scrollRockwall();
    boundaryCheck();
    boundaryCheckRock();
    rockwallBoundaryCheck();
    drawRockwall();
    drawClimber();
    drawRocks();
    count += 1;
}

function boundaryCheck() {
    if (y < 0) {
        y = 0;
    }
    if (y > canvas.height - CLIMBER_HEIGHT) {
        y = canvas.height - CLIMBER_HEIGHT;
    }
    if (x < 0) {
        x = 0;
    }
    if (x > canvas.width - CLIMBER_WIDTH) {
        x = canvas.width - CLIMBER_WIDTH;
    }
}

function drawClimber() {
    context.drawImage(imgClimber, x, y);
}

function clearScreen() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function inputs() {
    if (upPressed) {
        y -= moveSpeed;
    }
    if (downPressed) {
        y += moveSpeed;
    }
    if (rightPressed) {
        x += moveSpeed;
    }
    if (leftPressed) {
        x -= moveSpeed;
    }
}

function spawnRocks() {
    if (count % 100 === 0) {
        var rock = {
            x: getRandomInt(0, canvas.width - ROCK_WIDTH),
            y: 0
        };
        rocks.push(rock);
    }
}

function drawRocks() {
    for (let i = 0; i < rocks.length; i++){
        context.drawImage(imgRock, rocks[i].x, rocks[i].y);
    }
}

function moveRocks() {
    for (let i = 0; i < rocks.length; i++){
        rocks[i].y += rockSpeed;
    }
}

function boundaryCheckRock() {
    for (let i = rocks.length - 1; i >= 0; i--) {
        if (rocks[i].y > canvas.height) {
            rocks.splice(i, 1);
        }
    }
}

function drawRockwall() {
    context.drawImage(imgRockwall, rockwall.x, rockwall.y);
}

function scrollRockwall() {
    rockwall.y += rockwallSpeed;
}

function rockwallBoundaryCheck() {
    if (rockwall.y == 0) {
        rockwall.y = -800;
    }
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp)

function keyDown(event) {
    if (event.keyCode == UP_KEY_CODE) {
        upPressed = true;
    }
    if (event.keyCode == DOWN_KEY_CODE) {
        downPressed = true;
    }
    if (event.keyCode == LEFT_KEY_CODE) {
        leftPressed = true;
    }
    if (event.keyCode == RIGHT_KEY_CODE) {
        rightPressed = true;
    }
}

function keyUp(event) {
    if (event.keyCode == UP_KEY_CODE) {
        upPressed = false;
    }
    if (event.keyCode == DOWN_KEY_CODE) {
        downPressed = false;
    }
    if (event.keyCode == LEFT_KEY_CODE) {
        leftPressed = false;
    }
    if (event.keyCode == RIGHT_KEY_CODE) {
        rightPressed = false;
    }
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

drawGame();
