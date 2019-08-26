import React from 'react';

import './Sketches.less';

const links = {
  2016: [
    {
      title: 'Draw Walk',
      href: '/gallery/p5js/draw_walk',
    },
    {
      title: 'Cursor magic',
      href: '/gallery/p5js/magic',
    },
    {
      title: 'Flies',
      href: '/gallery/p5js/flies',
    },
    {
      title: 'Flies Mouse Acceleration',
      href: '/gallery/p5js/flies-m-acc',
    },
    {
      title: 'Bubbles',
      href: '/gallery/p5js/bubbles',
    }
  ],
  2012: [
    {
      title: 'Walkers',
      href: '/gallery/older',
    },
    {
      title: 'Networks',
      href: '/gallery/older/networks',
    },
    {
      title: 'Painter Walk',
      href: '/gallery/older/random_walker',
    },
    {
      title: 'Dots',
      href: '/gallery/older/dots',
    }
  ]
}

export default function() {
  return <div style={{display: 'flex'}}>
    {Object.keys(links).map(year => (
      <div key={year} style={{display: 'flex', flexDirection: 'column'}}>
        <h3>{`≈ ${year}`}</h3>
        <br/> {/* :-) */}
        {links[year].map((link, i) => (
          <a
            {...link}
            key={`${year}-${i}`}
            className="Gal--Item"
            target="_blank"
          >
            {link.title}
          </a>      
        ))}
      </div>
    ))}
</div>;
};