var score = 0;
var gameState = "play";
var end = 0;

function preload(){
backImg=loadImage("back.gif");
floorImg=loadImage("floor.png");
floor2Img=loadImage("floor2.png");
ninjaImg=loadAnimation("ninja.png","player.png");
ninjaImg2=loadAnimation("hero.png","shinko.png");
spikeImg=loadImage("spike.png");
overImg=loadImage("gameover.png");
song=loadSound("song.mp3");
jump=loadSound("Woosh Sound Effect.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  


  back=createSprite(windowWidth/2,windowHeight/2-200);
  back.addImage(backImg);
  back.scale=2.5;
  back.velocityY=6;
  

  floor1=createSprite(windowWidth/2-410,windowHeight/2-400);
  floor1.addImage(floorImg);
  floor1.scale=2.8;



  floor2=createSprite(windowWidth/2+410,windowHeight/2-400);
  floor2.addImage(floor2Img);
  floor2.scale=2.8;


  ninja=createSprite(windowWidth/2+100,windowHeight/2+700);
  ninja.addAnimation("runing",ninjaImg);
  ninja.scale=1;
  ninja.velocityX=20;


   wall1 = createSprite(windowWidth/2-360,windowHeight/2,40,2000);
  wall1.visible=false;
  
   wall2 = createSprite(windowWidth/2+360,windowHeight/2,40,2000);


   over=createSprite(windowWidth/2,windowHeight/2);
 over.addImage(overImg);
 over.scale=2.7;
  


  wall2.visible=false;

sgroup = new  Group();

song.loop();

}

function draw() { 
  background(0);
  drawSprites();

  
ninja.collide(wall1);
ninja.collide(wall2);
 
  if(gameState === "play"){

  if(back.y>windowHeight/2+1100){
    back.y=windowHeight/2-200;
     }
  
     back.velocityY=(35 + 3*score/60);
  
     if(floor1.y>windowHeight/2+380){
      floor1.y=windowHeight/2-400;
       }

       floor1.velocityY=(25 + 3*score/60);


       if(floor2.y>windowHeight/2+380){
        floor2.y=windowHeight/2-400;
         }
  
         floor2.velocityY=(25 + 3*score/60);
  

         if(ninja.isTouching(floor1)){
          if (keyDown(RIGHT_ARROW)) {
            ninja.velocityX=50;
            ninja.addAnimation("runing",ninjaImg);
         }
          }
         
               
             if(ninja.isTouching(floor2)){   
           if (keyDown(LEFT_ARROW)) {
            ninja.velocityX=-50;
            ninja.addAnimation("runing",ninjaImg2);
              } 
             }






if(touches.length > 0){
 
  if(ninja.isTouching(floor1)){
    ninja.velocityX=70;
      ninja.addAnimation("runing",ninjaImg);
      jump.play();
   }
    

   if(ninja.isTouching(floor2)){   
     ninja.velocityX=-70;
     ninja.addAnimation("runing",ninjaImg2);
     jump.play();
       } 
      


}



score = score + Math.round(getFrameRate()/60);

textSize(70);
fill("black");
text("Score : "+score,windowWidth/2-200,windowHeight/2-800);  


spawnSpike();


if(sgroup.isTouching(ninja)){
  gameState=end;
}

back.visible=true;
floor1.visible=true;
floor2.visible=true;
ninja.visible=true;
over.visible=false;


  }//play end

else if(gameState === end){

  if(touches.length > 0){
    gameState = "play";
  }

  back.visible=false;
  floor1.visible=false;
  floor2.visible=false;
  ninja.visible=false;
  sgroup.destroyEach();

  over.visible=true;

  score=0;

}







  }


  function spawnSpike(){
    if(World.frameCount % 20 === 0){
      var spike = createSprite(80, -50);
  spike.addImage(spikeImg);
  spike.scale=1.2;
  spike.velocityY=(35 + 3*score/60);
  
  
   var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: spike.x=windowWidth/2-250;
                break;
        case 2: spike.x=windowWidth/2+250;
                break;
        default: break;
      }
      
  
  spike.lifetime=90;
  
  sgroup.add(spike);
  
    }
  }
  