var flies = [];

var lifespan = 40;

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
}
function draw() {
  background(41);
  //for(var i=0;i<flies.length;i++){
  for (var i = flies.length-1; i >= 0; i--) {
    var fly = flies[i];
    fly.update();
    fly.display();
    if (fly.isDead()) {
      flies.splice(i, 1);
    }
  }
  
  // for (var i = this.particles.length-1; i >= 0; i--) {
  //   var p = this.particles[i];
  //   p.run();
  //   if (p.isDead()) {
  //     this.particles.splice(i, 1);
  //   }
  // }
  
}


function mouseMoved(mouse) {
  ///var mouse.pos = createVector(mouseX,mouseY);
  flies.push(new Form(mouse.clientX, mouse.clientY));
  //console.log(mouse)
}


function Form(x,y) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, 0);
  this.lifespan = lifespan;
  this.size = random(3,11);
  
  this.update = function(){
    this.acc = p5.Vector.fromAngle(random(TWO_PI), random(TWO_PI));
    //this.acc.div(30);
    this.acc.setMag(0.3);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan--;
  }
  
  this.display = function(){
    fill(255);
    var n = random();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
  
  
}

Form.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};
