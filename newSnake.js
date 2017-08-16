var FIELD_SIZE = 20;
var SNAKE_SPEED = 300;
var snake, food, head, field, pointsObj, pointsNum = 0;
var positionX, positionY, snakeLength;
var intervalID;
var walkHis = [];

window.onload = fieldCreator();
window.addEventListener("keydown", changeDirection);
document.getElementById("btn").addEventListener("click", startGame);

function startGame() {
    document.getElementById("btn").style.visibility = "hidden";
    snake = field.snakeSpawner();
    food = field.foodSpawner();
    intervalID = setInterval(snakeMotion, SNAKE_SPEED);
}

function fieldCreator() {
    var mainDiv = document.getElementsByTagName("div")[1];
    mainDiv.className = "mainDiv";
    field = document.createElement("div");
    field.className = "field";
    field.style.width = (FIELD_SIZE * 20) + "px";
    field.style.height = (FIELD_SIZE * 20) + "px";
    for (var index = 0; index < FIELD_SIZE; index++) {
        field.appendChild(rowCreator());
    }
    field.snakeSpawner = snakeCreator;
    field.foodSpawner = foodCreator;
    mainDiv.appendChild(field);
    pointsObj = document.getElementsByTagName("div")[0];
    pointsObj.textContent = pointsNum;
}

function rowCreator() {
    var result = document.createElement("div");
    result.className = "row";
    for (var i = 0; i < FIELD_SIZE; i++) {
        result.appendChild(cellCreator());
    }
    return result;
}

function cellCreator() {
    var result = document.createElement("div");
    result.className = "cell";
    return result;
}

function snakeCreator() {
    snakeLength = 5;
    for (var i = FIELD_SIZE - snakeLength; i < FIELD_SIZE; i++) {
        field.children[FIELD_SIZE / 2].children[i].className = "snakeCell";
    }
    snake = field.children[FIELD_SIZE / 2].children[FIELD_SIZE - snakeLength];
    snake.tail = field.children[FIELD_SIZE / 2].children[FIELD_SIZE - 1];
    positionY = FIELD_SIZE / 2;
    positionX = FIELD_SIZE - snakeLength;
    for (i = 1; i <= snakeLength; i++)
        walkHis.unshift(FIELD_SIZE - i, FIELD_SIZE / 2);
    snake.direction = "left";
    return snake;
}

function foodCreator() {
    do {
        food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    } while (food.className === "snakeCell");
    food.style.background = "red";
    return food;
}

function snakeMotion() {
    console.log("snakeDirection " + snake.direction);
    if (snake.direction === "up") {
        positionY--;
        ruleChecker(positionY, positionX);
        field.children[positionY].children[positionX].className = "snakeCell";
    }
    if (snake.direction === "down") {
        positionY++;
        ruleChecker(positionY, positionX);
        field.children[positionY].children[positionX].className = "snakeCell";
    }
    if (snake.direction === "left") {
        positionX--;
        ruleChecker(positionY, positionX);
        field.children[positionY].children[positionX].className = "snakeCell";
    }
    if (snake.direction === "right") {
        positionX++;
        ruleChecker(positionY, positionX);
        field.children[positionY].children[positionX].className = "snakeCell";
    }
    head = field.children[positionY].children[positionX];
    walkHis.unshift(positionX, positionY);
    console.log(snake.direction);
    if (head.style.background === "red") tailAdder();
    else tailCutter();
}

function ruleChecker(y, x) {
    console.log(walkHis);
    console.log(y,x);
    for (var i = 0; i < walkHis.length;) {
        if (x === walkHis[i++] && y === walkHis[i++]) {
            if (confirm("Game Over, you points is " + pointsNum + "\nPress OK to create a New Game")) location.reload();
            else alert("Game Over, please reload page");
        }
    }
    if (y >= FIELD_SIZE || x >= FIELD_SIZE || y < 0 || x < 0) {
        if (confirm("Game Over, you points is " + pointsNum + "\nPress OK to create a New Game")) location.reload();
        else alert("Game Over, please reload page");
    }
}

function tailCutter() {
    console.log("tailCutter");
    field.children[walkHis.pop()].children[walkHis.pop()].className = "cell";
}

function tailAdder() {
    console.log("tailAdder");
    head.style.background = snake.style.background;
    pointsObj.textContent = ++pointsNum;
    food.eat = false;
    food = foodCreator();
}

/* rule.keyCodes - up: 38; down:40; left: 37; right: 39*/
function changeDirection(event) {
    if (event.keyCode === 38 && snake.direction !== "down") {
        snake.direction = "up";
    }
    if (event.keyCode === 40 && snake.direction !== "up") {
        snake.direction = "down";
    }
    if (event.keyCode === 37 && snake.direction !== "right") {
        snake.direction = "left";
    }
    if (event.keyCode === 39 && snake.direction !== "left") {
        snake.direction = "right";
    }
}