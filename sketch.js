var balloon;
var database, balloonImage1, balloonImage2;
var backIg,position;


function preload() {

  backIg = loadImage("cityImage.png")

  balloonImage1=loadAnimation("HotAirBallon-01.png");
  //loaded all images to create an illusion of movement in airballoon just like we did for creating illusion of movement for trex
  balloonImage2=loadAnimation("HotAirBallon-01.png","HotAirBallon-01.png",
  "HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-02.png",
  "HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png","HotAirBallon-03.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1200,700);// i have increased the size of cans little bit

  balloon = createSprite(100, 350, 50, 50);
 // balloon.shapeColor="red";
  balloon.addAnimation("hotAirBalloon",balloonImage1);
 balloon.scale=0.5;

  var ballposition = database.ref('balloon/position');
    ballposition.on("value", readPosition, showError);

}


function draw() {
  background(backIg); 
  
  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    // scaling is added here so that when UP ARROW is pressed balloon become smaller
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
        // scaling is added here so that when DOWN ARROW is pressed balloon become bigger
    balloon.scale=balloon.scale +0.005;
  } 
  drawSprites();

  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);

}

function writePosition(x,y){
  database.ref('balloon/position').set(
{ 'x': position.x + x,
  'y': position.y + y
}
) 
}

function readPosition(data){

  position=data.val();
  console.log(position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
