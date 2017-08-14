FIELD_SIZE = 30;
SNAKE_SPEED = 1000;
window.onload = fieldCreator();
document.getElementById("btn").addEventListener("click", startGame);
window.addEventListener("keydown", changeDirection(event), false);


function startGame() {
    document.getElementById("btn").style.visibility = "hidden";
    snake = field.snakeSpawner();
    food = field.foodSpawner();
    var timerId = setTimeout(snakeMotion(), SNAKE_SPEED);
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
    var points = document.getElementsByTagName("div")[0];
    points.textContent = 0;
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
    for (var i = FIELD_SIZE - 3; i < FIELD_SIZE; i++) {
        field.children[FIELD_SIZE / 2].children[i].className = "snakeCell";
    }
    snake = field.children[FIELD_SIZE / 2].children[FIELD_SIZE - 3];
    snake.tail = field.children[FIELD_SIZE / 2].children[FIELD_SIZE - 2];
    snake.tail.tail = field.children[FIELD_SIZE / 2].children[FIELD_SIZE - 1];
    snake.direction = "left";
    return snake;
}

function foodCreator() {
    do {
        food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    } while (food.className === "snake-cell");
    food.eat = false;
    food.style.background = "red";
}

function snakeMotion() {
    var nexCell
}

/* rule.keyCodes - up: 38; down:40; left: 37; right: 39*/
function changeDirection(event){
    if (event.keyCode === 38 && snake.direction !== "down"){
        snake.direction = "up";
    }
}