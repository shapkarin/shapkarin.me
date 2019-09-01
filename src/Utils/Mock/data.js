// todo: move to the each component

export const sketches = {
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

  After: [
    {
      title: 'Sound Terrain',
      href: 'http://joy.shapkarin.me',
    },
    {
      title: 'Will upload to Github soon',
      href: 'https://shapkarin.github.io/3d-first-person/index.html',
    },
    {
      title: 'p5.js pattern experiment',
      href: 'https://editor.p5js.org/yu.shapkarin/sketches/ogR-xUkcT',
    },
    {
      title: 'Some more at codepen.io',
      href: 'https://codepen.io/shapkarin',
    }
  ]
};

export const projects = [
  {
    id: 1,
    name: 'Redkassa widget',
    url: 'https://widget.redkassa.ru'
  },
  {
    id: 2,
    name: 'Books.beeline.ru',
    url: ''
  },
  {
    id: 3,
    name: 'Saga-Fetch',
    url: 'https://www.npmjs.com/package/saga-fetch'
  },
  {
    id: 4,
    name: 'Extend-Saga-Routines',
    url: 'https://www.npmjs.com/package/extend-saga-routines'
  }
];

const infos = [
  {
    id: 1,
    content: {
      __html: 'App to buy tickets for events: shows, theaters, music concerts, etc. \
      <br/> \
      stack: react, redux, redux-saga, normalizr, axios, axios-mock-adapter, \
      webpack, jest, webpack SVG sprites, git hooks and etc',
    }
  },
  {
    id: 2,
    content: {
      __html: 'Internet library for <a href="https://beeline.ru" target="_blank">Beeline</a>'
    }
  },
  {
    id: 3,
    content: {
      __html: 'Redux-Saga fetch common worker. <br/><br/> <img alt="npm" src="https://img.shields.io/npm/v/saga-fetch?style=social"> <img alt="npm" src="https://img.shields.io/npm/dt/saga-fetch?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/saga-fetch?style=social">'
    }
  },
  {
    id: 4,
    content: {
      __html: 'Extend any routine with custom stages, create routine that has redux-saga-routines default stages and create routine with only yours custom stages. <br/> <img alt="npm" src="https://img.shields.io/npm/v/extend-saga-routines?style=social"> <img alt="npm" src="https://img.shields.io/npm/dt/extend-saga-routines?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/extend-saga-routines?style=social"> <img alt="Travis (.org)" src="https://img.shields.io/travis/shapkarin/extend-saga-routines?label=Tests&style=social">'
    }
  }
];

export const getProjectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos.filter(el => el.id == id)[0];
};

export const about = 'I like to code. \
Stack in production: React, Redux, Redux-Saga, Backbone, \
ROR, Koa, Webpack, Grunt, Gulp. Also used stylus, \
less, jade(pug), haml, twig, underscore, ejs \
and explore much more.';
