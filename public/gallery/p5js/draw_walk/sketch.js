var flies = [];
var count = 100;
var step = 1;//, total;
var _alpha = count/1.5;
var flag = false;
var some_stat = document.createElement('div');
some_stat.style.fontFamily = 'Helvetica';
some_stat.style.fontSize = '12px'
some_stat.style.position = "absolute";
some_stat.style.top = "20px";
some_stat.style.left = "20px";
some_stat.style.color = "rgba(255,255,255,0.7)";


function setup() {
  var canvas = createCanvas(window.innerWidth,window.innerHeight);
  background(41);
  createFlyies(count);
  document.getElementsByTagName('body')[0].appendChild(some_stat);
}

function draw() {
  for(var i=0;i<flies.length;i++){
    var fly = flies[i];
    fly.update();
    fly.display();
    if(fly.away()){
      flies.splice(i, 1);
      //file:///Users/yury/Documents/draw_walk/index.html
    }
  }
  if(flies.length === 0){
    seed();
  }//else if (flies.length === 1){
    //saveCanvas('FullScreen population count: ' + random(), '.png');
  //}
  
  
  //if(flies.length < count/3 && flies.length > count/4){
   // saveCanvas('population count: ' + c++, 'png');
    
    //createFlyies();
  //}
}

//canvas.prototype.count = function(){}

function mouseClicked() {
  //saveCanvas('population count', 'jpg');
  
    seed();
  //}
}

function seed(){
  ++step;
  flies.length = 0;
  if(count > 300){
    count = 100;
    step = 1;
  }else {
    count *= 1.5
  }
  createFlyies(count);
}

function createFlyies(count) {
  background(41);
  var _color = [];
  var startColor = color('#382a91')//color( random(255), random(255), random(255));
  var endColor = color('#4a9ce2')//color( random(255), random(255), random(255));
  //fill(255, this.lifespan);
  //get color range
  var _step = 1 / count;
  
  for (var i = 0; i < count; i++) {
    var lerped_color = lerpColor(startColor,endColor,_step * i)
    flies.push(new Fly(width/2,height/2,lerped_color));
    //_step = _step * (i + 1);
    
  }
  //console.log(flies[10]['color'])
  some_stat.innerHTML = "Seed #" + step  +  "<br>Wait until <strong>" + flies.length + " objects</strong> disappear then generate a new seed";
}


  

function Fly(x,y,_color) {
  this.pos = createVector(x,y);
  this.vel = createVector(0, 0);
  this.size = random(1.343,2.342);
  this.lifespan = random(200);
  //this.aplha /= 3
  this.color = _color;
  //console.log(this.color)
  
  
  this.update = function(){
    this.acc = p5.Vector.fromAngle(random(TWO_PI));
    //this.acc.div(30);
    this.acc.mult(0.05);
    //this.acc.normalize();
    //this.acc.setMag(0.5)
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan-=0.5;
    
    if(this.away()){
      //console.log('Object gone')
      // some_stat.innerHTML = "Object id# " + this.id + " was removed.<br>"
      // + "Last properties was:<br>"
      // + "&nbsp;&nbsp;&nbsp;Acceleration: " + this.acc.x + ',' + this.acc.y + "<br>"
      // + "&nbsp;&nbsp;&nbsp;Velocity: " + this.vel.x + ',' + this.vel.y + "<br>"
      // + "&nbsp;&nbsp;&nbsp;Position: " + this.pos.x + ',' + this.pos.y + "<br><br>"
      // + "Waiting for: <strong>" + (flies.length - 1) + " objects</strong> before new population<br>"
      some_stat.innerHTML = "Seed #" + step  +  "<br>Wait until <strong>" + flies.length + " objects</strong> disappear then generate a new seed";
    }
   
}
  
  this.display = function(){
    
    //fill(255, this.lifespan);
    //console.log(this.lifespan.toFixed());
    //colorMode(HSL);
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
    //fill('rgba(255,255,255,' + this.lifespan + ')');
    noStroke();
   // ellipse(this.pos.x, this.pos.y, 1, 1)
   ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}



function colorAlpha(aColor, alpha) {
  var c = aColor;
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}


Fly.prototype.away = function(){
  //if (((this.pos.x > width) || (this.pos.x < 0)) || ((this.pos.y > height) || (this.pos.y < 0))) {
    //return true;
  if (this.lifespan <= 0) {
     return true;
  } else {
    return false;
  }
};
