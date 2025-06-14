// TODO: refact
import random from 'lodash.random';
import Shape from './Shape';

const STROKE_COLOR = `rgba(255, 255, 255, ${random(0.05, 0.142)})`;

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
    // const countY = 40;
    // const itemW = Math.floor(this.width / countY);
    //const countX = Math.floor(this.height / itemW);
    // this.countX = countX;
    this.countX = 50;
    // const itemH = itemW;
    // it works too, functional:
    // return [...Array(countY)].map((row, rowI) => [...Array(countX)].map((cell, colI) => new Shape({ x: itemW * colI, y: itemH * rowI, ctx: this.ctx, row: rowI, col: colI })));
    
    // as an example
    const result = [];
    let rowI = 0;
    let colI = 0;

    for (let x = 10; x < this.width - 10; x += 20) {
      colI = 0;
      result.push([]);
      for (let y = 10; y < this.height - 10; y += 20) {
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
    this.ctx.beginPath();
    this.ctx.fillStyle = '#0b1723';
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const shape = this.array2D[rowI][colI];
        shape.draw();
      }
    }
    const times = random(20, 28);
    for(let i = 0; i < times; i++){
      this.drawCross();
    }
    this.ctx.closePath();
    // window.requestAnimationFrame(this.draw);
  }

  getRandomItem = () => this.array2D[random(1, this.array2D.length - 1)][random(1, this.countX - 1)];

  drawCross = () => {
    const randomItem = this.getRandomItem();
    // const randomItem = this.array2D[4][4];
    this.ctx.strokeStyle = STROKE_COLOR;
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

  randomizeAll = () => {
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const shape = this.array2D[rowI][colI];
        shape.randomize();
      }
    }
  }

  randomizeSome = () => {
    const item = this.getRandomItem();
    item.randomize();
  }

  // randomTimes = () => random(10) > 1 ? [1] : [2, 20]

  animation = () => {
    const delay = random(1000, 3000);
    // const times = this.randomTimes();
    setTimeout(() => {
      for (let i = 0; i < random.apply(this, [1,10]); i++) {
        // this.getRandomItem().animate();
        this.randomizeSome();
      }
      this.draw();
      this.animation();
    }, delay);
  }
}
