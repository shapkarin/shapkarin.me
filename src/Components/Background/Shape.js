import random from 'lodash/random';

export default class Shape {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.row = props.row;
    this.col = props.col;
    this.radius = random(4, 9);
    this.size = random(6, 16);
    this.ctx = props.ctx;
  }

  draw = () => {
    const methods = ['drawCircle', 'drawRect', 'drawNothing'];
    this[methods[random(methods.length - 1)]]();
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

}
