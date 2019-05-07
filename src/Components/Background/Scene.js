// TODO: refact
import paper from 'paper';

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

    paper.setup(this.canvas);
    this.array2D = this.createArray();
    this.animatingItems = [];
    this.draw();
    this.animation();
    
    let item;
    paper.view.onFrame = () => { 
      for (let rowI = 0; rowI < this.array2D.length; rowI++) {
        for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
          item = this.array2D[rowI][colI];
          if(item.type === 'drawRect' && item.isAnimate){
            item.shape.rotate(2);
          }
        }
      }
    }
    
    // this.ctx = this.canvas.getContext('2d');
    // this.ctx.lineWidth = 1;
    // this.ctx.fillStyle = "";
    // maybe I'll refact to the flat array
    
    // this.draw();
    // this.canvas.addEventListener('click', () => {
    //   this.randomizeAll();
    //   this.draw();
    // });
    // this.animation();

    // TODO: background color
  }

  //  TODO..
  createArray = () => {
    const countY = 40;
    const itemW = Math.floor(this.width / countY);
    const countX = Math.floor(this.height / itemW);
    // this.countX = countX;
    this.countX = 50;
    const itemH = itemW;
    
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
    // this.ctx.beginPath();
    // this.ctx.fillStyle = '#17293a';
    // this.ctx.closePath();
    // this.ctx.fillRect(0, 0, this.width, this.height);
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const shape = this.array2D[rowI][colI];
        shape.draw();
      }
    }
    // const times = random(20, 28);
    // for(let i = 0; i < times; i++){
    //   this.drawCross();
    // }
    
    // window.requestAnimationFrame(this.draw);
  }

  getRandomItem = () => this.array2D[random(1, this.array2D.length - 1)][random(1, this.countX - 1)];

  drawCross = () => {
    const randomItem = this.getRandomItem();
    // const randomItem = this.array2D[4][4];
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${random(0.05, 0.1)})`;
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

  randomTimes = () => random(10) > 1 ? [1] : [2, 20]

  animation = () => {
    const delay = random(100, 200);
    const times = this.randomTimes();
    setTimeout(() => {
      for (let i = 0; i < random.apply(this, [50,200]); i++) {
        const shape = this.getRandomItem();
        if (!shape.isAnimate) {
          shape.isAnimate = true;
        } else {
          shape.isAnimate = false;
        }
        //this.randomizeSome();
      }
      //this.draw();
      this.animation();
    }, delay);
  }
}
