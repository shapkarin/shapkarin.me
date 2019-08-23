import React, { Component } from 'react';
import favloader from 'favloader';

import './Sketches.less';

const animation = () => {
  let p = 0;
  let reversed = false;
  const width = 2;
  const size = 32;

  const Line = (ctx, i) => {
    ctx.fillStyle = `rgb(0, 0, ${10 * i})`;
    ctx.fillRect(i, p, width, size);
  };

  const frame = (ctx) => {
    [...Array(1)].map((_, i) => Line(ctx, i));
    // for(let line of lines){
    //   line();
    // }

    if (reversed) {
      p--;
      if (p === 0) {
        reversed = false;
      }
    } else {
      p++;
      if (p === size - width) {
        reversed = true;
      }
    }
  };
  return frame;
}

class Sketches extends Component {

  componentDidMount() {
    const frameCreator = animation();
    const frame = ctx => frameCreator(ctx);

    favloader.init({ size: 32, frame });
    favloader.start();
  }

  componentWillUnmount() {
    favloader.stop();
  }

  render() {
    return <div style={{margin: "20px"}}>
      <a className="Gal--Item" href="/gallery/p5js" target="_blank">P5.js ≈2016</a>
      <a className="Gal--Item" href="/gallery/older" target="_blank">Pure JS ≈2012</a>
    </div>;
  }
  
};

export default Sketches;
