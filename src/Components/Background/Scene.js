// TODO
import Shape from './Shape';
import random from 'lodash/random';

export default class Scene {
  constructor() {
    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'background';
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 1;
    // this.ctx.fillStyle = "";
    this.array2D = this.createArray();
    this.draw();
  }

  //  TODO..
  createArray = () => {
    const countY = 20;
    const itemW = Math.floor(this.width / countY);
    const countX = Math.floor(this.height / itemW);
    this.countX = countX;
    const itemH = itemW;
    return [...Array(countY)].map((row, rowI) => [...Array(countX)].map((cell, colI) => new Shape({ x: itemW * colI, y: itemH * rowI, ctx: this.ctx })));
  }

  // TODO..
  draw = () => {
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const shape = this.array2D[rowI][colI];
        shape.draw();
      }
    }
  }
  
}
