
/* SPACE DEFENDER - GAME */

// 1. GET HTML ELEMENTS

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const shootBtn = document.getElementById("shootBtn");
const restartBtn = document.getElementById("restartBtn");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const gameMessage = document.getElementById("gameMessage");

// 2. LOAD IMAGES

const spaceship = new Image();
spaceship.src = "images/spaceship.png";

const enemyImage = new Image();
enemyImage.src = "images/enemy.png";

// 3. PLAYER SETTINGS

let player = {
    x: 270,
    y: 310,
    width: 60,
    height: 70,
    speed: 5
};

// 4. GAME VARIABLES

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let bullets = [];
let enemies = [];

let score = 0;
let lives = 3;
let gameRunning = false;

let enemyTimer = 0;
let lastShot = 0;

// 5. DRAW PLAYER

function drawPlayer() {

    if (spaceship.complete && spaceship.naturalWidth > 0) {

        ctx.drawImage(
            spaceship,
            player.x,
            player.y,
            player.width,
            player.height
        );

    } else {

        // FALLBACK IF IMAGE DOES NOT LOAD
        ctx.fillStyle = "#38bdf8";

        ctx.beginPath();
        ctx.moveTo(player.x + player.width / 2, player.y);
        ctx.lineTo(player.x + player.width, player.y + player.height);
        ctx.lineTo(player.x, player.y + player.height);
        ctx.closePath();
        ctx.fill();
    }
}

// 6. MOVE PLAYER

function movePlayer() {

    if (moveLeft) player.x -= player.speed;
    if (moveRight) player.x += player.speed;
    if (moveUp) player.y -= player.speed;
    if (moveDown) player.y += player.speed;

    // KEEP PLAYER INSIDE CANVAS

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;

    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// 7. SHOOT BULLETS

function shoot() {

    if (!gameRunning) return;

    // SHOOTING COOLDOWN
    if (Date.now() - lastShot < 200) return;

    lastShot = Date.now();

    bullets.push({
        x: player.x + player.width / 2 - 3,
        y: player.y,
        width: 6,
        height: 15,
        speed: 7
    });
}

// 8. CREATE ENEMIES

function createEnemy() {

    const enemyWidth = 55;
    const enemyHeight = 55;

    enemies.push({
        x: Math.random() * (canvas.width - enemyWidth),
        y: -enemyHeight,
        width: enemyWidth,
        height: enemyHeight,
        speed: 2
    });
}

// 9. DRAW ENEMY

function drawEnemy(enemy) {

    if (enemyImage.complete && enemyImage.naturalWidth > 0) {

        ctx.drawImage(
            enemyImage,
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );

    } else {

        // FALLBACK IF IMAGE DOES NOT LOAD
        ctx.fillStyle = "#a78bfa";

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );
    }
}

// 10. CHECK COLLISION

function isColliding(a, b) {

    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// 11. UPDATE BULLETS

function updateBullets() {

    for (let i = bullets.length - 1; i >= 0; i--) {

        let bullet = bullets[i];

        bullet.y -= bullet.speed;

        ctx.fillStyle = "#38bdf8";

        ctx.fillRect(
            bullet.x,
            bullet.y,
            bullet.width,
            bullet.height
        );

        if (bullet.y + bullet.height < 0) {
            bullets.splice(i, 1);
        }
    }
}

// 12. UPDATE ENEMIES

function updateEnemies() {

    for (let i = enemies.length - 1; i >= 0; i--) {

        let enemy = enemies[i];

        enemy.y += enemy.speed;

        drawEnemy(enemy);

        // BULLET HITS ENEMY

        let destroyed = false;

        for (let j = bullets.length - 1; j >= 0; j--) {

            if (isColliding(enemy, bullets[j])) {

                enemies.splice(i, 1);
                bullets.splice(j, 1);

                score += 10;
                scoreText.textContent = score;

                destroyed = true;
                break;
            }
        }

        if (destroyed) continue;

        // ENEMY HITS PLAYER

        if (isColliding(enemy, player)) {

            enemies.splice(i, 1);
            loseLife();
            continue;
        }

        // ENEMY REACHES BOTTOM

        if (enemy.y > canvas.height) {

            enemies.splice(i, 1);
            loseLife();
        }
    }
}

// 13. LOSE LIFE

function loseLife() {

    lives--;
    livesText.textContent = lives;

    if (lives <= 0) {

        gameRunning = false;

        gameMessage.textContent =
            "GAME OVER! Final Score: " + score +
            " | Press START / RESTART to try again!";
    }
}

// 14. GAME LOOP

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameRunning) {

        movePlayer();
        updateBullets();

        enemyTimer++;

        if (enemyTimer >= 60) {
            createEnemy();
            enemyTimer = 0;
        }

        updateEnemies();
    }

    drawPlayer();

    // GAME OVER SCREEN
    if (!gameRunning && lives <= 0) {

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 40px Arial";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2
        );

        ctx.font = "22px Arial";

        ctx.fillText(
            "FINAL SCORE: " + score,
            canvas.width / 2,
            canvas.height / 2 + 40
        );
    }

    requestAnimationFrame(gameLoop);
}

// 15. KEYBOARD CONTROLS

document.addEventListener("keydown", function(event) {

    if ([
        "ArrowLeft", "ArrowRight",
        "ArrowUp", "ArrowDown",
        "KeyW", "KeyA", "KeyS", "KeyD",
        "Space"
    ].includes(event.code)) {
        event.preventDefault();
    }

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        moveLeft = true;
    }

    if (event.code === "ArrowRight" || event.code === "KeyD") {
        moveRight = true;
    }

    if (event.code === "ArrowUp" || event.code === "KeyW") {
        moveUp = true;
    }

    if (event.code === "ArrowDown" || event.code === "KeyS") {
        moveDown = true;
    }

    if (event.code === "Space" && !event.repeat) {
        shoot();
    }
});

document.addEventListener("keyup", function(event) {

    if (event.code === "ArrowLeft" || event.code === "KeyA") {
        moveLeft = false;
    }

    if (event.code === "ArrowRight" || event.code === "KeyD") {
        moveRight = false;
    }

    if (event.code === "ArrowUp" || event.code === "KeyW") {
        moveUp = false;
    }

    if (event.code === "ArrowDown" || event.code === "KeyS") {
        moveDown = false;
    }
});

// 16. STOP MOVEMENT WHEN WINDOW LOSES FOCUS

window.addEventListener("blur", function() {
    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
});

// 17. MOUSE CONTROLS

canvas.addEventListener("mousedown", function(event) {

    if (event.button === 0) {
        shoot();
    }
});

// 18. ON-SCREEN BUTTON CONTROLS

leftBtn.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    moveLeft = true;
});

rightBtn.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    moveRight = true;
});

function stopMoving() {
    moveLeft = false;
    moveRight = false;
}

document.addEventListener("pointerup", stopMoving);
document.addEventListener("pointercancel", stopMoving);

shootBtn.addEventListener("pointerdown", function(event) {
    event.preventDefault();
    shoot();
});

// 19. START / RESTART GAME

restartBtn.addEventListener("click", function() {

    player.x = 270;
    player.y = 310;

    bullets = [];
    enemies = [];

    score = 0;
    lives = 3;

    enemyTimer = 0;
    lastShot = 0;

    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;

    scoreText.textContent = score;
    livesText.textContent = lives;

    gameRunning = true;

    gameMessage.textContent =
        "Game started! Destroy the aliens!";
});

// 20. START GAME LOOP

gameLoop();
