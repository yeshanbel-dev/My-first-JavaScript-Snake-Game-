const gameBoard = document.querySelector(".gameBoard");
const ctx = gameBoard.getContext("2d");
// canvas or gameBoard height and width
const Board_width = gameBoard.width;
const Board_height =gameBoard.height;

// each segment size is 25
const unitSize = 20;
let scoreText = document.querySelector(".score");
let score = 0;
// snakes speed initially (CHANGED TO 'let' SO THE SNAKE CAN TURN LATER)
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let isRunning = true;
// creating the snake body using array. The snake is the coordinate of an array 
// Initially it has five segments
let snake =[
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0}
];

// Here is the function which draws each segments 
function drawSnake(){
// like real barker here is just selcting a painting color for insider
ctx.fillStyle ="limegreen";
// here is for the border(outsider)
ctx.strokeStyle = "darkgreen";

// By using for loop paint every segments of the snake body
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, unitSize, unitSize);
            ctx.strokeRect(snake[i].x, snake[i].y, unitSize, unitSize);

        }

    }
drawSnake()

// Move the snake forward
function moveSnake(){
//    Declearing a newHead object that will use to add the newhead in every 100micro second
    const newHead ={
        x:snake[0].x + xVelocity,
        y:snake[0].y +yVelocity
    }
    // by using array built in method add the head and pop  up the tail 
  snake.unshift(newHead);
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score+=1;
    scoreText.textContent = score;
    createFood()
}
else{
  snake.pop();
}
};

// Now we need to create the food
const createFood = () =>{
// I use Math.floor instead of Math.round here just to create the food inside of the gameBoard
    foodX = Math.floor(Math.random()*Board_width/unitSize)*unitSize;
    foodY = Math.floor(Math.random()*Board_height/unitSize)*unitSize;
}
createFood()
// The food drawer function
const drawFood = () =>{
    // This is like picking a barker
ctx.fillStyle = "red";
// And this one actually paint the food by using the red barker
ctx.fillRect(foodX, foodY, unitSize, unitSize)
}
drawFood();
// By using setInterval method move the function in every 100micro second clear the board move the snake and call the draw function agin
const gameLoop = setInterval(()=>{
if(isRunning){
    moveSnake();
    ctx.clearRect(0, 0, Board_width, Board_height);
    drawFood()
    drawSnake();
    checkGameOver()
    
}else {// Stop the background process
        clearInterval(gameLoop); 
        displayGameOver();
    }

}, 100);



// Here is the function which changes the direction of the snake 
// based on the event click on the keyboard
const changeDirection = document.addEventListener("keydown", (event)=>{
    // console.log(event);
const goingLeft = (xVelocity ===-unitSize);
const goingUp = ( yVelocity === -unitSize);
const goingRight = (xVelocity === unitSize);
const goingDown =(yVelocity === unitSize);

   switch(true){
// Go to the left if the event.key is ArrowLeft
        case( event.key === "ArrowLeft"  && !goingRight):
        xVelocity = -unitSize;
        yVelocity = 0;
        break;

// Go to the upside if the event.key is ArrowUp 
        case(event.key ==="ArrowUp" && !goingDown):
        xVelocity = 0;
        yVelocity = -unitSize
        break;

// Go to the right if the event.key is ArrowRight
        case(event.key === "ArrowRight" && !goingLeft):
        xVelocity = unitSize;
        yVelocity = 0;
        break;

// Go to the downside if the event.key is ArrowDown
        case(event.key ==="ArrowDown" && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;

    }

});

function checkGameOver(){

    switch(true){
    // If the snake hit the right side of the board
        case(snake[0].x == Board_width):
        isRunning = false;
        break;

    // If the snake hits the lower side of the board
        case(snake[0].y == Board_height):
        isRunning = false;
        break;

    //  If the snake hits the left side of the board
        case(snake[0].x < 0 ):
        isRunning = false;
        break;

    // If the snake hits the upper side of the board
        case(snake[0].y < 0):
        isRunning = false;
        break
    }

    // If the snake bits his own body 
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
                isRunning = false;
    
            }
        }

}
function displayGameOver(){
    // The barker that we use to draw the text on the canvas I select black
    ctx.fillStyle = "#FF4D4D";
    // How the text should look on the board I chose to be bold italic and font size 50px font Arial
    ctx.font ="bold italic 50px Arial";
    // The text should appear on the center of the board due to that the textAlign and textBaseline should be  center
    ctx.textAlign ="center"
    ctx.textBaseline = "middle"
    // paint the text on the middle of the board by using the black barker
    ctx.fillText("Game Over!", Board_width / 2, Board_height / 2);
}








