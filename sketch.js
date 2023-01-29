const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine
var world

var tower
var towerImage
var backgroundImage
var cannon
var angle
var ground
var cannonball

var balls = []
var boats = []

function preload() {

  backgroundImage = loadImage("assets/background.gif");
  towerImage = loadImage("assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200, 600);

  engine = Engine.create()
  world = engine.world

  var options = {
    isStatic: true
  }
  ground = Bodies.rectangle(750, 599, 1500, 1, options);
  World.add(world, ground)

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower)

  angleMode(DEGREES)
  angle = 15
  cannon = new Cannon(180, 110, 130, 100, angle);






  rectMode(CENTER)




}

function draw() {

  image(backgroundImage, 0, 0, 1200, 600)
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, 1500, 1)

  push();
  imageMode(CENTER)
  image(towerImage, tower.position.x, tower.position.y, 160, 310)
  pop();

  cannon.display()
  for (var b = 0; b < balls.length; b++) {
    showCannonballs(balls[b],b);
    collisionWithBoat(b)
  }
  showBoats()
}


function keyReleased() {

  if (keyCode == DOWN_ARROW) {

    balls[balls.length - 1].shoot()
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonball = new Cannonball(cannon.x, cannon.y);
    cannonball.trajectory = [];
    Matter.Body.setAngle(cannonball.body, cannon.angle)
    balls.push(cannonball)
  }

}

function showCannonballs(ball,index) {
  if (ball) {
    ball.display()
    if(ball.body.position.x>width || ball.body.position.y>= height-50){
      ball.remove(index)
    }
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-40, -70, -20, -60]
      var t = random(positions)
      var boat = new Boat(width, height - 100, 170, 170, t)
      boats.push(boat);
    }
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, {
          x: -0.9,
          y: 0
        })
        boats[i].display()
      }
    }
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60)
    boats.push(boat);
  }

}

function collisionWithBoat(index) {
  for (var z = 0; z < boats.length; z++) {
    if (boats[z] != undefined && balls[index] != undefined) {
      var h = Matter.SAT.collides(balls[index].body, boats[z].body)
      if (h.collided) {
        boats[z].remove(z)
        World.remove(world, balls[index].body)
        delete balls[index]
      }
    }
  }

}