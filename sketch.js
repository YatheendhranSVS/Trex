var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup,cloudimg;
var obstaclesGroup,ob1img,ob2img,ob3img,ob4img,ob5img,ob6img;
var gameOver,gameOverimg;
var restart,restartimg;
var score;
    
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudimg = loadImage("cloud.png");
  
  ob1img = loadImage("obstacle1.png");
  ob2img = loadImage("obstacle2.png");
  ob3img = loadImage("obstacle3.png");
  ob4img = loadImage("obstacle4.png");
  ob5img = loadImage("obstacle5.png");
  ob6img = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup=new Group();
  obstaclesGroup=new Group(); 
}

function draw() {
  background(180);
  
  if(keyDown("space")) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();
  
  trex.collide(invisibleGround);
  drawSprites();
}



function spawnObstacles()
{
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
        switch(rand)
    {
      case 1: obstacle.addImage(ob1img);  
              break;
      case 2: obstacle.addImage(ob2img);  
              break;
      case 3: obstacle.addImage(ob3img);  
              break;
      case 4: obstacle.addImage(ob4img);  
              break;
      case 5: obstacle.addImage(ob5img);  
              break;
      case 6: obstacle.addImage(ob6img);  
              break; 
      default:break;        
              
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
  }
}

function spawnClouds()
{
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(70,120));
    cloud.addImage(cloudimg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime =200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
