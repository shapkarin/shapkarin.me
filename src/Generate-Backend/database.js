/* eslint-disable no-multi-str */
import { createHash } from 'crypto';

export const about = {
  title: `Hello everyone!`,
  intro: 'With over 13 years of experience in software development and a strong foundation in Computer Science. My work underlines my dedication to innovation, problem-solving, and creating impactful user experiences.'
}

export const packages = {
  author: 'shapkarin',
  badgeStyle: 'social',
  get order(){
    return [
      'extend-saga-routines',
      'redux-scaffolder',
      'saga-fetch',
      'global-diff'
    ];
  },

  get database() {
    return {
      'extend-saga-routines': {
        title: 'Extend Saga Routines (Extend Routines)',
        url: 'https://github.com/shapkarin/extend-saga-routines',
        description: `
          From v3.3.0 redux-saga is optional. Action creator lib.
          Extend any routine with custom stages, create routine with more than defafult stages and create custom routine.`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l', `travis/${this.author}` ]
      },

      'redux-scaffolder': {
        title: 'Redux Scaffolder',
        url: 'https://www.npmjs.com/package/redux-scaffolder',
        description: `
          CLI app to generate redux files: "constants.js, actions.js, reducers.js."`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },

      'saga-fetch': {
        title: 'Saga Fetch',
        url: 'https://www.npmjs.com/package/saga-fetch',
        description: `
          Redux-Saga fetch common worker.`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },

      'global-diff': {
        title: 'Global diff',
        url: 'https://www.npmjs.com/package/global-diff',
        description: `
          Compare yours window with the list of default scope.
          Project has plans with auto grab default globals
          from more and integration as part of browsers extensions.`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },

    };
  },

  toShieldsLink(type, name, options){
    return `https://img.shields.io/${type}/${name}?style=${this.badgeStyle}${options ? `&${options}` : ''}`;
  },

  toBadges(list, name, options){
    const titles = (title) => {
      const DEFAULT = 'Badge';
      const vocab = {
        'npm/v': 'NPM version',
        'npm/dm': 'Downloads per month',
        'npm/l': 'License',
        [`travis/${this.author}`]: DEFAULT,
      };
      return vocab[title] || ''
    };

    return list.map(type => ({
            title: titles(type),
            link: this.toShieldsLink(type, name),
          }))
  },

  get list(){
    return this.order.map((name) => {
      const { title, url, description, badges = [] } = this.database[name];
      const descriptionCleared = clean(description);
      
      return {
        id: generateChecksum(descriptionCleared),
        url,
        title,
        name,
        description: descriptionCleared,
        badges: this.toBadges(badges, name)
      }
    })
  },
}

export const sketches = {
  title: 'A part of my creative coding artworks',
  description: clean(`
    The rest of the artwork can be shown on personal request.

    Generative art, animation and music visualization experiments
    to lear, research and practice. Usually was build fast.
    It's like a sketch drawing but with code.
    Some are made with pure JS, other with libraries`),
  collection: {
    'Archive ≈2012': [
      {
        title: 'Dots',
        href: '/gallery/older/dots.html',
      },
      {
        title: 'Walkers',
        href: '/gallery/older',
      },
      {
        title: 'Painter Walk',
        href: '/gallery/older/random_walker.html',
      },
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
      },
    ],
  }
};

function generateChecksum(str, algorithm, encoding){
    return createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

function clean(string){
  return string.replace(/^\n/, '').replace(/ +/g, ' ')
}
