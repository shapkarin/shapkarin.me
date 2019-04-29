// import Shape from './Shape';
// TODO

export default class Scene {
  constructor() {
    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    
    this.array2D = this.createArray();
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'background';
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.draw();
  }

  // TODO..
  draw = () => {
    for (let rowI = 0; rowI < this.array2D.length; rowI++) {
      for (let colI = 0; colI < this.array2D[rowI].length; colI++) {
        const cords = this.array2D[rowI][colI];
        this.ctx.beginPath();
        this.ctx.arc(cords.x, cords.y, 20, 0, 2 * Math.PI);
        this.ctx.stroke();
      }
    }
  }

  //  TODO..
  createArray = () => {
    const countY = 20;
    const itemW = Math.floor(this.width / countY);
    const countX = Math.floor(this.height / itemW);
    const itemH = itemW;
    return [...Array(countY)].map((row, rowI) => [...Array(countX)].map((cell, colI) => [itemW * colI, itemH * rowI]));
  }
}
