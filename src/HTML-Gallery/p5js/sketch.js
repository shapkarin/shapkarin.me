/*
 * @name Noise Wave
 * @description Using Perlin Noise to generate a wave-like pattern.
 * Original by Daniel Shiffman.
 */
var yoff = 0.0;        // 2nd dimension of perlin noise
var v = {
  min: 500,
  max: 650
};

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}



function mouseMoved() {
  //var mouse = createVector(mouseX, mouseY);
  //console.log(v.add(mouse));
  //v.min = mouseX*0.7;
  //v.min = mouseY*0.6;
}


function draw() {
  background(255);

  fill(0,59,104);
  noStroke();
  // We are going to draw a polygon out of the wave points
  beginShape(); 
  
  var xoff = 0;       // Option #1: 2D Noise
  //var xoff = yoff; // Option #2: 1D Noise
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 15) {
    // Calculate a y value according to noise, map to 
    
    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 1, v.min, v.max);

    // Option #2: 1D Noise
    // var y = map(noise(xoff), 0, 1, 200,300);
    
    // Set the vertex
    vertex(x, y); 
    // Increment x dimension for noise
    xoff += 0.04;
  }
  // increment y dimension for noise
  yoff += 0.005;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}
