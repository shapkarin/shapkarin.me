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
  }

  draw = () => {
    this[this.type]();
  }

  drawCircle = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${random(0.03, 0.05)})`;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawRect = () => {
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${random(0.03, 0.05)})`;
    this.ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    this.ctx.stroke();
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
      }
      if (this.radius <= 4) {
        this.dir = 1;
      }
    } else {
      this.size += 0.05 * this.dir;
      if (this.size >= 16) {
        this.dir = -1;
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
  }
}
