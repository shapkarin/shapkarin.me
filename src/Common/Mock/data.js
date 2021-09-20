// todo: data.yml or data.md

export const about = `<h1>Hello. My name is Yury Shapkarin and I like to code 👨‍💻</h1>\
I helped to develop and create a lot of great projects. <br /> \
Some of them was commertial, some are not, some was a mix of both. <br /> \
I write JavaScript each day and I like to spend my spare time to <br />explore other languages and technologies.`;

export const sketches = {
  'Archive ≈2012': [
    {
      title: 'Walkers',
      href: '/gallery/older',
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
      title: 'Cubes',
      href: 'https://codepen.io/shapkarin/full/doRpxy'
    },
    {
      title: 'Some more at codepen.io',
      href: 'https://codepen.io/shapkarin',
    }
  ]
};

export const packages = [
  {
    id: 1,
    name: 'Extend Saga Routines (Extend Routines)',
    url: 'https://www.npmjs.com/package/extend-saga-routines'
  },
  {
    id: 2,
    name: 'Redux Scaffolder',
    url: 'https://www.npmjs.com/package/redux-scaffolder'
  },
  {
    id: 3,
    name: 'Saga Fetch',
    url: 'https://www.npmjs.com/package/saga-fetch'
  },
  {
    id: 4,
    name: 'Global diff',
    url: 'https://www.npmjs.com/package/global-diff'
  }
];

const infos = [
  {
    id: 2,
    content: 'CLI app to generate redux files: "constants.js, actions.js, reducers.js." <br/><br/> <div><img alt="npm" src="https://img.shields.io/npm/v/redux-scaffolder?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/redux-scaffolder?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/redux-scaffolder?style=social"></div>'
  },
  {
    id: 3,
    content: 'Redux-Saga fetch common worker. \
<br/><br/> <div><img alt="npm" src="https://img.shields.io/npm/v/saga-fetch?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/saga-fetch?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/saga-fetch?style=social"></div>'
  },
  {
    id: 1,
    content: `More info about <a href="https://www.npmjs.com/package/redux-saga-routines" target="_blank">routines</a>. <br />\
    From v3.3.0 redux-saga is optional. <br /> \
    Extend any routine with custom stages, create routine with more than defafult stages and create custom routine. \
<br/><br/> <div><img alt="npm" src="https://img.shields.io/npm/v/extend-saga-routines?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/extend-saga-routines?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/extend-saga-routines?style=social"> <img alt="Travis (.org)" src="https://img.shields.io/travis/shapkarin/extend-saga-routines?label=Tests&style=social"></div>`
  },
  {
    id: 4,
    content: 'Compare yours window with the list of default scope. Project has big plans with auto grab global defaults scopes from other repos and also integration as part of browsers extensions.'
  }
];

export const getProjectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos.find(el => el.id == id);
};
