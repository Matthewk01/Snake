var highest_score;
function setup() {
  createCanvas(450, 450);
  food.x = floor(random(1,30)) * 15;
  food.y = floor(random(1,30)) * 15;
  highest_score = 0;
}

var snake = {
  x : 10 * 15,
  y : 10 * 15,
  xVel : 0,
  yVel : 0,
  changeDir : function(x, y) {
    this.xVel = x;
    this.yVel = y;
  },
  total : 5,
  tail : 0
  
};

var tailParts = [];

var food = {
   x : 0,
   y : 0
}

function draw() {
  frameRate(8);
  background(0, 0, 180);
  noStroke();
  fill(0,0,0);
  for(var y = 0; y < (30); y++) {
    for(var x = 0; x < (30); x++) {
     rect(15*x,15*y,14,14); 
    }
  }
  fill(255,0,0);
  rect(food.x, food.y, 14, 14);
  snake.x += snake.xVel * 15;
  snake.y += snake.yVel * 15;
  tailParts.push({x1: snake.x, y1: snake.y});
  
  while(tailParts.length > (snake.total + snake.tail)){
    tailParts.shift();
  }
  for(let x of tailParts) {
    fill(0,255,0);
    rect(x.x1, x.y1, 14, 14);
  }
  
  if(snake.x > width) {
   snake.x = 0; 
  }
  if(snake.x < 0) {
   snake.x = width; 
  }
  if(snake.y > height) {
   snake.y = 0; 
  }
  if(snake.y < 0) {
   snake.y = height; 
  }
  
  if(snake.x == food.x && snake.y == food.y) {
   snake.tail += 1; 
  
  let notFound = true;
  while(notFound) {
    food.x = floor(random(1,30)) * 15;
    food.y = floor(random(1,30)) * 15;
     for(let s of tailParts) {
       if(s.x1 == food.x && s.y1 == food.y){
         notFound = true;
         break;
       } else {
         notFound = false;
       }
     }
  }
  }
  
  if(snake.tail > 1) {
    for(i = 0; i < (snake.total + snake.tail - 2); i++) {
     if(snake.x == (tailParts[i]).x1 && snake.y == tailParts[i].y1){
      snake.tail = 0; 
     }
    }
  }
    if(snake.tail > highest_score)
    {
     highest_score = snake.tail; 
    }
    text("Highest score: " + highest_score, 10, 10);
    text("Score: " + snake.tail, 106, 10);
}

function keyPressed() {
 if(keyCode == UP_ARROW) {
   if(snake.yVel == 1) {
     return;
   }
   snake.changeDir(0, -1);
 } else if(keyCode == RIGHT_ARROW) {
   if(snake.xVel == -1) {
     return;
   }
   snake.changeDir(1, 0);
 } else if(keyCode == LEFT_ARROW) {
   if(snake.xVel == 1) {
     return;
   }
   snake.changeDir(-1, 0);
 } else if(keyCode == DOWN_ARROW) {
   if(snake.yVel == -1) {
     return;
   }
   snake.changeDir(0, 1);
 }

 }

function mousePressed() {
  snake.tail += 1;
 // if(mouseX < 350 && mouseX > 0 && mouseY < 400 && mouseY > 100){
 //   snake.changeDir(-1, 0);
 // }else if(mouseX < 450 && mouseX > 220 && mouseY < 400 && mouseY > 100) {
 //   snake.changeDir(1, 0);
 // }else if(mouseX < 350 && mouseX > 20 && mouseY > 0 && mouseY < 220) {
 //    snake.changeDir(0, -1);
 // } else if(mouseX < 400 && mouseX > 100 && mouseY < 600 && mouseY > 400){
 //   snake.changeDir(0, 1);
 // }
}