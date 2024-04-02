rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

score = 0

brickRowCount = 9
brickColumnCount = 5

// Create brick properties
brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create bricks
bricks = []
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        let x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {
            x,
            y,
            ...brickInfo
        }
    }
}

//Create ball properties
ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4;
    dy: -4;
}

// Create Paddle properties
paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height / 2 - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

//Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

//Draw paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

// Draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}


// Draw bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill
            ctx.closePath()
        })
    })
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

// Move paddle on canvas
function movePaddle() {
    paddle.x = paddle.x + paddle.dx
}

// Wall detection
if (paddle.x < 0) {
    paddle.x = 0
}
if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w
}

// Keydown Event
function keyDown(e) {
    // console.log(e.key)
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = -paddle.speed
    }
}

// Keyup Event
function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy


// wall collision (top)
if (ball.y + ball.size < 0) {
    ball.dy = -1 * ball.dy
}

// wall collision (right)
if (ball.x + ball.size > canvas.width) {
    ball.dx = -1 * ball.dx
}

// wall collision (bottom)
if (ball.y + ball.size > canvas.height) {
    ball.dy = -1 * ball.dy
    showAllBricks()
    score = 0
}
//wall collision (left)
if (ball.x + ball.size < 0) {
    ball.dx = -1 * ball.dx
}
}

// paddle collision
if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
) {
    ball.dy = -1 * ball.speed
}

// Brick collision
bricks.forEach(column => {
    column.forEach(brick => {
        if (brick.visible) {
            if (
                ball.x - ball.size > brick.x && // left brick side
                ball.x + ball.size < brick.x + brick.w && // right
                ball.y + ball.size > brick.y && // top
                ball.y - ball.size < brick.y + brick.h // bottom
            ) {
                ball.dy = -1 * ball.dy
                brick.visible = false
                increaseScore()
            }
        }
    })
})

// increase score
function increaseScore() {
    score++

    if (score == brickRowCount * brickColumnCount) {
        score = 0
        showAllBricks()
    }
}
// Shows all bricks
function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}

// Update canvas drawing and do the animation
function update() {
    mvoeBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)

}

update()

// Rules open and close event handlers
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})
