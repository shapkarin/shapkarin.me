//TODO: refact
import random from 'lodash.random';

export default class Shape {
  constructor({x, y, row, col, ctx}) {
    this.drawMethods = [
      'drawCircle',
      'drawRect',
      'drawNothing'
    ];
    this.type = this.getRandomShape();
    this.x = x;
    this.y = y;
    this.row = row;
    this.col = col;
    this.ctx = ctx;
    // this.dir = 1;
    this.radius = random(4, 9);
    this.size = random(6, 16);
    this.opacity = this.getRandomOpacity();
  }

  getRandomShape = () => this.drawMethods[random(this.drawMethods.length - 1)]

  getRandomOpacity = () => Math.random() < 0.8 ? random(0.04, 0.08) : random(0.15, 0.23)

  getColor = () => `rgba(255, 255, 255, ${this.opacity})`

  draw = () => {
    this[this.type]();
  }

  drawCircle = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.getColor();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawRect = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.getColor();
    this.ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawNothing(){
    return 'heh';
  }

  
  animate = () => {
    if (this.type === 'drawCircle') {
      this.radius += 0.05 * this.dir;
      if (this.radius >= 9) {
        this.dir = -1;
        this.type = 'drawRect';
      }
      if (this.radius <= 4) {
        this.dir = 1;
      }
    } else {
      this.size += 0.05 * this.dir;
      if (this.size >= 16) {
        this.dir = -1;
        this.type = 'drawCircle';
      }
      if (this.size <= 6) {
        this.dir = 1;
      }
    }
  }

  randomize = () => {
    this.radius = random(4, 9);
    this.size = random(6, 16);
    this.type = this.getRandomShape();
    this.opacity = this.getRandomOpacity();
  }
}
