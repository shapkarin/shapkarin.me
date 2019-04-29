import random from 'lodash/random';

export default class Shape {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.radius = random(5, 20);
    this.ctx = props.ctx;
  }

  draw = () => {
    this.ctx.beginPath();
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() + 0.2})`;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

}
