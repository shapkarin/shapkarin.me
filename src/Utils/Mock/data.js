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
