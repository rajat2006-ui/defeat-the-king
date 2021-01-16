const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var bomb, slingshot;
var log1,log2,log3,log4,log5,log6,log7,log8
var gameState = "onSling";
var score = 0;
var enemy,enemyImg,enemyVisibility
var oneCount=0,twoCount=0
var turns=4
var leftEdgeWall,rightEdgeWall,topEdgeWall

function preload() {
   enemyImg=loadImage("king.png")
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    leftEdgeWall=new Ground(0,height/2,1,400)
    rightEdgeWall=new Ground(1200,height/2,1,400)
    topEdgeWall=new Ground(600,0,1200,1)
   
    log1 = new Log(600,340,100,PI);
    log2=new Log(800,340,100,PI)
    log3 =  new Log(700,280,230,PI/2);

    log4 = new Log(600,220,100,PI);
    log5 = new Log(800,220,100,PI);
    log6=new Log(700,160,230,PI/2)

    log7=new Log(600,100,100,PI)
    log8=new Log(800,100,100,PI)

    bomb = new Bomb(190,70);
   
    slingshot = new SlingShot(bomb.body,{x:190, y:70});
   
    enemy=Bodies.rectangle(700,30,50,50)
    World.add(world,enemy)
}

function draw(){
   
    background("lightblue");

    fill("red")
    textSize(30)
    text("Chances Left :"+ turns,800,50)

    Engine.update(engine);
    //strokeWeight(4);
   
    ground.display();
   
    log1.display();
    log2.display()
   
    log3.display();

   
    log4.display();
    log5.display();
    log6.display()
    log7.display()
    log8.display()

    bomb.display();
    platform.display();
    //log6.display();
    slingshot.display();  
    //bomb2.display()
    
    if(gameState!=="won"){
        push()
        imageMode(CENTER)
        image(enemyImg,enemy.position.x,enemy.position.y,100,100)
        pop()
    }

    if(enemy.position.y>280){
        gameState="won"
    }
    
    if(gameState==="won"){
        fill("green")
        textSize(30)
        text("You Won",400,50)
        World.remove(world,enemy)
    }

    else if(gameState!=="lost"){
        fill("green")
        textSize(30)
        text("Some Logs Are Fixed",300,50)

        fill("green")
        textSize(30)
        text("Make The King To Fall",280,150)
    }

    else if(gameState==="lost"){
        fill("red")
        textSize(30)
        text("You Lost",400,50)
    }

    if(turns===0 && bomb.body.speed<1){
        gameState="lost"
    }

}

function mouseDragged(){
    if (gameState==="onsling" && turns>0){
        Matter.Body.setPosition(bomb.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    if(gameState!=="won" && turns>0){
        slingshot.fly();
        gameState = "launched";
        turns-=1
    }
}

function keyPressed(){
    
    if(keyCode === 32 && turns>0 && bomb.body.speed<1 || bomb.body.position.y>400){
       Matter.Body.setPosition(bomb.body,{x:0,y:0})
       slingshot.attach(bomb.body);
       gameState="onsling";

    }
}
