//Create variables here
var database;
var lastFed = 0;
var dog,dogImage,dogImage1,food,foodImage,foodStock,foodRef;

function preload()
{
  //load images here
  backgroundImg = loadImage("bg.png");
  dogImage = loadImage("Dog.png");
  dogImage1 = loadImage("happydog.png");
  foodImage = loadImage("Bone.png");
  bathImage = loadImage("bath.png");
  sleepImage = loadImage("sleep.png");
  playImage = loadImage("play.png");
  walkImage = loadImage("walk.png");
  

}

function setup() {
  createCanvas(480, 480);

  //Sprites

  food = createSprite(250,400,50,50);
  food.addImage(foodImage);
  food.scale = 0.3;


  dog = createSprite(400,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  //Firebase
  database = firebase.database();

  //Reference for food
  foodRef = database.ref("Food");
  foodRef.on("value",read,console.log("error"));

  foodRef.set(20);


}


function draw() {  
  background(backgroundImg);
  
 fill("white");
 textSize(15);
 if(lastFed>=12){
   text("Last Fed (approx timing) : "+ lastFed%12 + " PM", 240,30);
  }else if(lastFed==0){
    text("Last Fed (approx timing)  = 12 AM",240,30);
  }else{
    text("Last Fed (approx timing)  = "+ lastFed + " AM", 240,30);
  }

  drawSprites();
  
  //add styles here
  textSize(32);
  fill("blue");
  text("Bones in the Stock: "+foodStock,50,300);
 // textSize(25);
  //text("Hi! Will you help me in doing some works ?",50,70)
  decreaseFood();
  if(foodStock===0){
    foodStock = 20;
  }

  if(keyWentUp(DOWN_ARROW)){
    
    dog.addImage(bathImage);
    
    
  }

  if(keyWentUp(LEFT_ARROW)){
   
    dog.addImage(sleepImage);
    dog.scale = 0.3
    
    
  }

  if(keyWentUp(RIGHT_ARROW)){
   
    dog.addImage(playImage);
    dog.scale = 0.3
    
    
  }

  if(keyCode === 32){
    
    dog.addImage(walkImage);
    dog.scale = 0.3
 }

}

function read(data){
  foodStock = data.val();
}

function decreaseFood(){
  if(keyWentDown(UP_ARROW)){
  foodRef = database.ref("Food");
  foodStock = foodStock - 1;
  foodRef.set(foodStock);
  dog.addImage(dogImage1);
  food.x = 350;
  food.y = 200;
  food.scale = 0.1;

  }
  
  if(keyWentUp(UP_ARROW)){
    
    foodStock = foodStock;
    dog.addImage(dogImage);
    fill("yellow");
    text('Thank you ',10,80);
    food.x = 250;
    food.y = 400;
    food.scale = 0.2;
    
  }
}

