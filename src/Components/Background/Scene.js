// import Shape from './Shape';

export default class Scene {
  constructor() {
    this.width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    this.height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
    
    this.array2D = this.createArray();
    console.log(this.array2D);
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
