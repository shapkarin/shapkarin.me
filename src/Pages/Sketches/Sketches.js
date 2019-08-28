import React from 'react';

import './Sketches.less';

const links = {
  'Archive ≈2012': [
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
  ],
  'Archive ≈2016': [
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
  'After': [
    {
      title: 'Sound Terrain',
      href: 'http://joy.shapkarin.me',
    },
    {
      title: 'Will upload to Github soon',
      href: 'https://shapkarin.github.io/3d-first-person/index.html',
    }
  ]
}

export default function() {
  return <div style={{display: 'flex'}}>
    {Object.keys(links).map(category => (
      <div key={category} style={{display: 'flex', flexDirection: 'column'}}>
        <h3>{`${category}:`}</h3>
        <br/> {/* :-) */}
        {links[category].map((link, i) => (
          <a
            {...link}
            key={`${category}-${i}`}
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