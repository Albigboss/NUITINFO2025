const gridSize = 20;
const canvasSize = 400;

const snakeColor = "lime";
const snakeHead = "$";
const snakeBody = "*"

const foodColor = "crimson";
const foodBody = "¤";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 10, y: 10 }, // head    0
  { x: 9, y: 10 }, // segment 1
  { x: 8, y: 10 }, // segment 2
  { x: 7, y: 10 }, // segment 3
];
let snakeSize = 4;

let food = { x: 15, y: 10 };
let dx = 0;
let dy = 0;
let appleEten = 0;

let gameloop;

function handlekeyPress(e) {

  const key = e.key;
  if (key === "ArrowUp" && dy !== 1) {
    dx = 0;
    dy = -1;
    if (gameloop === undefined) {
      gameloop = setInterval(updateGame, 200);
    }
  } else if (key === "ArrowDown" && dy !== -1) {
    dx = 0;
    dy = 1;
    if (gameloop === undefined) {
      gameloop = setInterval(updateGame, 200);
    }
  } else if (key === "ArrowLeft" && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (key === "ArrowRight" && dx !== -1) {
    dx = 1;
    dy = 0;
    if (gameloop === undefined) {
      gameloop = setInterval(updateGame, 200);
    }
  }
}

function gameOver() {
  clearInterval(gameloop);
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", 120, 130);
  ctx.fillText(`Score: ${appleEten}`, 135, 170);
  window.location.href = "../"
}

function updateGame() {
  
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // Wrap around the canvas
  if ((head.x < 0)||(head.x >= canvasSize / gridSize)||
      (head.y < 0)||(head.y >= canvasSize / gridSize)) {
    gameOver();
    return;
  }

  // check if the snake touches its own body
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    appleEten += 1;
    snakeSize +=1;
    generateFood();
    console.log("gen fruit");

  }
  else {
    snake.pop();
  }

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  drawSnake();
  drawFood();
  drawBorder();
}

function drawBorder(){
  ctx.fillStyle = "White";
  ctx.font = "15px monospace";
  for(let i=0;i<gridSize;++i){
    ctx.fillText("_",(i*gridSize)+5,canvasSize-2,gridSize);
    ctx.fillText("_",(i*gridSize)+5,0,gridSize);
    ctx.fillText("|",canvasSize-5,(i*gridSize)+15,gridSize);
    ctx.fillText("|",-4,(i*gridSize)+15,gridSize);
  }
}

function drawSnake() {
  snake.forEach((segment, index) => {
      ctx.fillStyle = snakeColor;
      ctx.font = "15px monospace";
    if (index === 0) {
      ctx.fillText(snakeHead,
        (segment.x * gridSize)+5,
        (segment.y * gridSize)+15,
        gridSize);
    } else {
      ctx.fillStyle = snakeColor;
      ctx.fillText(snakeBody,
        (segment.x * gridSize)+5,
        (segment.y * gridSize)+17,
        gridSize);
    }
  });
}

function generateFood() {
  let onSnake = true;
  while(onSnake === true){
    onSnake = false

    food = {
      x: Math.floor(Math.random() * (canvasSize / gridSize)),
      y: Math.floor(Math.random() * (canvasSize / gridSize)),
    };

    for(let i = 0; i<snakeSize; ++i){
      //console.log("snake : ",snake[i].x,snake[i].y," | apple : ",food.x,food.y);
      if((snake[i].x === food.x) && (snake[i].y === food.y)){
        console.log("Nan");
        onSnake = true;
      }
    }
  }
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.font = "15px monospace";
  ctx.fillText(foodBody,
        (food.x * gridSize)+5,
        (food.y * gridSize)+15,
        gridSize);
}

generateFood();
drawBorder();
document.addEventListener("keydown", handlekeyPress);   