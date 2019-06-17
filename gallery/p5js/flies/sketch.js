var flies = [];
var count = 100;
  
function setup() {
  createCanvas(window.innerWidth,window.innerHeight);


for (var i = 0; i < count; i++) {
    flies.push(new Fly(width/2,height/2));
  }
}
function draw() {
  background(41);
  for(var i=0;i<flies.length;i++){
    flies[i].update();
    flies[i].display();
  }
  
}

function Fly(x,y) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, 0);
  
  this.update = function(){
    this.acc = p5.Vector.fromAngle(random(TWO_PI), random(TWO_PI));
    //this.acc.div(30);
    this.acc.mult(0.3);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4)
  }
    
}