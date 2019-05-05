import random from 'lodash/random';

export default class Shape {
  constructor(props) {
    this.methods = ['drawCircle', 'drawRect', 'drawNothing'];
    this.type = this.methods[random(this.methods.length - 1)];
    this.x = props.x;
    this.y = props.y;
    this.row = props.row;
    this.col = props.col;
    this.radius = random(4, 9);
    this.size = random(6, 16);
    this.ctx = props.ctx;
    this.dir = 1;
    //todo
    this.opacity = this.randomOpacity();
  }

  randomOpacity = () => random(10) > 1 ? random(0.03, 0.07) : random(0.1, 0.22)

  draw = () => {
    this[this.type]();
  }

  drawCircle = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawRect = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawNothing(){
    return 'heh';
  }

  //TODO: refact
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
    this.type = this.methods[random(this.methods.length - 1)];
    this.opacity = this.randomOpacity();
  }
}
