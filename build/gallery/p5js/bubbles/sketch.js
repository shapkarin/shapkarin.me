var system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, height/2));
}

function draw() {
  background(255);
  system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);
  this.position = position.copy();
  this.lifespan = 255;
  this.random = random(5,10);
  this.size = createVector(this.random,this.random);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.acceleration = p5.Vector.fromAngle(random(TWO_PI), random(TWO_PI));
  
  //this.acc.normalize();
  this.acceleration.div(10);
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  
  // this.velocity.add(this.acceleration);
  // this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  //stroke(200, this.lifespan);
  strokeWeight(0);
  fill(18,100,169, this.lifespan);
  ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};