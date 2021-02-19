var monkey, monkey_running;
var banana, bananaImg;
var stone, stoneImg;
var obstacleGrp;
var foodGrp;
var jungle, jungleImg;
var score = 0;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  jungleImg = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(50,480,1,1);
  monkey.addAnimation("monkey_move", monkey_running);
  monkey.scale = 0.1;
  
  jungle = createSprite(300,300,1,1);
  jungle.addImage(jungleImg);
  jungle.velocityX = -4;  
  
  invisibleGround = createSprite(300,510,600,1);
  invisibleGround.visible = false;
  
  obstacleGrp = new Group();
  foodGrp = new Group();
  
}

function draw() {
  background(220);
  
  monkey.depth = jungle.depth;
  monkey.depth ++;
  
  if (jungle.x < 120) {
    jungle.x = 300;
    
  }
  
  if (invisibleGround < 0) {
    invisibleGround.x = 300;
    
  }
  
  if (keyDown("space") && monkey.y > 250) {
    monkey.velocityY = -7;
    
  }
  
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(invisibleGround);
  
  if (monkey.isTouching(obstacleGrp)) {
    monkey.scale = 0.1;
    
  }
  
  if (monkey.isTouching(foodGrp)) {
    score = score + 2;
    foodGrp.destroyEach();
    
  }
  
  switch(score) {
    case 10 : monkey.scale = 0.12;
      break;
    case 20 : monkey.scale = 0.14;
      break;
    case 30 : monkey.scale = 0.16;
      break;
    case 40 : monkey.scale = 0.18;
      break;
    default : break;
      
  }
  
  spawnObstacles();
  spawnFood();
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("white");
  text("Score:" + score, 500,50);
  
}

function spawnFood() {
    if (frameCount % 150 === 0) {
    var banana = createSprite(600, 150);
        banana.addImage(bananaImg);
        banana.scale = 0.05;
      
        banana.depth = jungle.depth;
        banana.depth ++;
        
        banana.y = Math.round(random(220, 420));
        banana.velocityX = -2;
        
        banana.lifetime = 800;
      
        foodGrp.add(banana);
     }
}

function spawnObstacles() {
    if (frameCount % 370 === 0) {
    var stone = createSprite(600, 480);
        stone.addImage(stoneImg);
        stone.scale = 0.17;
      
        stone.depth = jungle.depth;
        stone.depth ++;
      
        stone.velocityX = -2;

        stone.lifetime = 800;
      
        obstacleGrp.add(stone);
  }
}
