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
    var mouse = createVector(mouseX,mouseY);
    this.acc = p5.Vector.fromAngle(random(TWO_PI), random(TWO_PI));
    
    this.acc.mult(0.03);
    this.vel.add(this.acc);
    //this.pos.add(this.vel);
    
    this.acc2 = p5.Vector.sub(mouse, this.pos);
    //this.acc2.mult(0.0007);
    this.acc2.setMag(0.05);
    
    this.vel.add(this.acc2);
    this.pos.add(this.vel);

  }
  
  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4, 4)
  }
    
}