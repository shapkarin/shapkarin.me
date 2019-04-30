// TODO: refact
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
    this.ctx.lineWidth = 1;
    // this.ctx.fillStyle = "";
    this.array2D = this.createArray();
    this.draw();
  }

  //  TODO..
  createArray = () => {
    const countY = 40;
    const itemW = Math.floor(this.width / countY);
    const countX = Math.floor(this.height / itemW);
    // this.countX = countX;
    this.countX = 50;
    const itemH = itemW;
    // it works too, functional:
    // return [...Array(countY)].map((row, rowI) => [...Array(countX)].map((cell, colI) => new Shape({ x: itemW * colI, y: itemH * rowI, ctx: this.ctx, row: rowI, col: colI })));
    
    // as an example
    const result = [];
    let rowI = 0;
    let colI = 0;

    for (var x = 20; x < this.width - 20; x += 20) {
      colI = 0;
      result.push([]);
      for (var y = 20; y < this.height - 20; y += 20) {
        result[rowI].push(
          new Shape({ x, y, ctx: this.ctx, row: rowI, col: colI })
        );
        colI++;
      }
      rowI++;
    }
    this.countX = colI;
    return result;
  }

  // TODO..
  draw = () => {
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const shape = this.array2D[rowI][colI];
        shape.draw();
      }
    }
    const times = random(5, 50);
    for(let i = 0; i < 28; i++){
      this.drawCross();
    }
  }

  drawCross = () => {
    const getRandomItem = () => this.array2D[random(1, this.array2D.length - 1)][random(1, this.countX - 1)];
    
    const randomItem = getRandomItem();
    // const randomItem = this.array2D[4][4];
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${random(0.05, 0.15)})`;
    this.ctx.beginPath();
    this.ctx.moveTo(randomItem.x, randomItem.y);
    const nextCol = randomItem.col + random(this.countX - randomItem.col - 1);
    const rightItem = this.array2D[randomItem.row][nextCol];
    this.ctx.lineTo(rightItem.x, rightItem.y);
    const someCol = random(randomItem.col, nextCol);
    const topItem = this.array2D[random(0, randomItem.row - 1)][someCol];
    this.ctx.moveTo(topItem.x, topItem.y);
    const buttomItem = this.array2D[random(0, this.array2D.length - 1)][someCol];
    this.ctx.lineTo(buttomItem.x, buttomItem.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  
}
