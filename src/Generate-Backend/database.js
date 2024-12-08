/* eslint-disable no-multi-str */
import { createHash } from 'crypto';

export const about = {
  title: `Hello everyone`,
  intro: `
    With over 10 years of experience in software development and a strong foundation in Computer Science. My work underlines my dedication to innovation, problem-solving, and creating impactful user experiences.
  `
}

export const packages = {
  author: 'shapkarin',
  badgeStyle: 'social',

  get order(){
    return [
      'saga-fetch',
      'extend-routines',
      'diff-browser-globals',
    ];
  },

  get database() {
    return {
      'extend-routines': {
        title: 'Extend Routines',
        url: 'https://github.com/shapkarin/extend-routines',
        description: `
          Customizable action creator lib for any kind of actions.`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },
      'saga-fetch': {
        title: 'Saga Fetch',
        url: 'https://github.com/shapkarin/saga-fetch',
        description: `
          Redux-Saga worker, created to simplify a fetch worker implementation.`,
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },
      'diff-browser-globals': {
        title: 'Global diff',
        url: 'https://github.com/shapkarin/diff-browser-globals',
        description: `
          Compare your window and browser default scopes.`,
        badges: []
      },
    }
  },

  toShieldsLink(type, name){
    return `https://img.shields.io/${type}/${name}?style=${this.badgeStyle}`;
  },

  toBadges(list, name){
    const titles = (title) => {
      const vocab = {
        'npm/v': 'NPM version',
        'npm/dm': 'Downloads per month',
        'npm/l': 'License',
      }
      return vocab[title] || ''
    }

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
    The rest can be shown upon personal request.
    Generative art, animation, and music visualization experiments for learning, researching, and practicing.
    These were usually built quickly. It's like sketching but with code.
    Some are made with pure JS, others with libraries.
`),
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
        title: 'Sound Terrain (FFT + Three.js)',
        href: 'http://joy.shapkarin.me',
      },
      {
        title: 'Going to upload to the Github',
        href: 'https://shapkarin.github.io/3d-first-person/index.html',
      },
      {
        title: 'The p5.js pattern experiment',
        href: 'https://editor.p5js.org/yu.shapkarin/sketches/ogR-xUkcT',
      },
      {
        title: 'Cubes',
        href: 'https://codepen.io/shapkarin/full/doRpxy'
      },
      {
        title: 'My codepen profile',
        href: 'https://codepen.io/shapkarin',
      },
    ],
  }
}

function generateChecksum(str, algorithm, encoding){
    return createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

function clean(string){
  return string.replace(/^\n/, '').replace(/ +/g, ' ')
}