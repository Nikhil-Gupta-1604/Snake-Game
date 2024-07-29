let set_Btn = document.querySelector("#set-btn")
let setBtn = document.querySelector(".setting-btn")
let setBox = document.querySelector(".setting-box")
let gameBoard = document.querySelector(".game-board")
let scoreEl = document.querySelector(".score")
let highScoreEl = document.querySelector(".high-score")
let control = document.querySelectorAll(".control i")

// setBtn.addEventListener('click', function () {
//     setBox.classList.toggle("active")
// })

let i
let setIntervalId
let gameOver = false
let snakeBody = []
let foodX = 15, foodY = 10
let snakeX = 5, snakeY = 10
let velocityX = 0, velocityY = 0
let score = 0

let highScore = localStorage.getItem("high-score") || 0
highScoreEl.innerHTML = `High Score is : ${highScore} `

control.forEach((key)=>{
    key.addEventListener('click' , ()=>direction({key : key.dataset.key}))
})

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1)
    foodY = Math.floor(Math.random() * 30 + 1)
}

const handleGameOver = () => {
    alert("Game Over ! Press OK to Restart")
    clearInterval(setIntervalId)
    location.reload()
}

const direction = (e) => {
    if (e.key == "ArrowUp" && velocityY != 1 ) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.key == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.key == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}


const snakeGame = () => {   

    if(gameOver) return handleGameOver()

    let html = `<div class="food" style="grid-area : ${foodY} / ${foodX}"></div>`
    
    if (snakeX == foodX & snakeY == foodY) {
        updateFoodPosition()
        snakeBody.push([foodX, foodY])
        score++
        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score" , highScore)
        scoreEl.innerHTML = `Score is : ${score} `
        highScoreEl.innerHTML = `High Score is : ${highScore} `
    }

    if(snakeX <= 0 || snakeX >= 30 || snakeY <= 0 || snakeY >= 30){
        gameOver = true
    }

    for(i=snakeBody.length-1 ; i>0 ; i--){
        snakeBody[i]= snakeBody[i-1]
    }

    snakeBody[0] = [snakeX , snakeY]

    snakeX += velocityX
    snakeY += velocityY

    for (i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver =  true
        }
    }
    gameBoard.innerHTML = html
}


updateFoodPosition()

setIntervalId = setInterval(() => {
    snakeGame()
}, 125)

document.addEventListener('keydown', direction)

