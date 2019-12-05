// todo: data.yml or data.md

export const about = 'I like to code. \
I was involved in some great projects, \
create some from scratch \
and create open source projects. \
<br/> \
Mostly I use JavaScript but \
also explore some new or just interesting in computer science.';

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

export const projects = [
  {
    id: 1,
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
    name: 'Extend Saga Routines',
    url: 'https://www.npmjs.com/package/extend-saga-routines'
  }
];

const infos = [
  {
    id: 1,
    content: {
      __html: 'Generate three redux files by CLI: "constants.js, actions.js, reducers.js." <br/><br/> <img alt="npm" src="https://img.shields.io/npm/v/redux-scaffolder?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/redux-scaffolder?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/redux-scaffolder?style=social">'
    }
  },
  {
    id: 3,
    content: {
      __html: 'Redux-Saga fetch common worker. \
<br/><br/> <img alt="npm" src="https://img.shields.io/npm/v/saga-fetch?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/saga-fetch?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/saga-fetch?style=social">'
    }
  },
  {
    id: 4,
    content: {
      __html: 'Extend any routine with custom stages, create routine with more than defafult stages and create custom routine. \
<br/><br/> <img alt="npm" src="https://img.shields.io/npm/v/extend-saga-routines?style=social"> <img alt="npm" src="https://img.shields.io/npm/dm/extend-saga-routines?style=social"> <img alt="NPM" src="https://img.shields.io/npm/l/extend-saga-routines?style=social"> <img alt="Travis (.org)" src="https://img.shields.io/travis/shapkarin/extend-saga-routines?label=Tests&style=social">'
    }
  }
];

export const getProjectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos.find(el => el.id == id);
};
