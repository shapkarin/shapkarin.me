/* eslint-disable no-multi-str */
import { createHash } from 'crypto';

export const about = {
  greeting: `Hello everyone!`,
  intro: clean(`
    My name is Yuri Shapkarin. 
    I am a software engineer with over a decade of experience and a solid foundation in Computer Science.
    My work reflects a firm commitment to innovation, problem-solving, and delivering exceptional user experiences.
  `),
  links: {
    linkedin: {
      link: 'https://www.linkedin.com/in/shapkarin',
      text: 'LinkedIn',
    },
    github: {
      link: 'https://github.com/shapkarin',
      text: 'GitHub',
    },
  },
}

export const main = {
  title: 'Welcome to my homepage.',
  list: [
    "Articles is a page with a list of software development articles.",
    "Repositories page is a list of my GitHub repos with metadata for each.",
    "Likes is a page with GitHub repositories that I've starred.",
    "Packages is a list of personal npm packages and in progress OSS projects.",
    "Creative contains a part of my creative coding.",
  ]
}

export const packages = {
  author: 'shapkarin',
  badgeStyle: 'social',

  get order(){
    return [
      'saga-fetch',
      'extend-routines',
      'mermaid-render',
      'diff-browser-globals',
    ];
  },

  get database() {
    return {
      'extend-routines': {
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },
      'saga-fetch': {
        badges: [ 'npm/v', 'npm/dm', 'npm/l' ]
      },
      'diff-browser-globals': {
        badges: []
      },
      'mermaid-render': {
        title: 'Mermaid Render (in dev)',
        url: 'https://github.com/shapkarin/mermaid-render',
        description: `
          Render mermaid diagrams as images and insert them into the markdown. Used in this website's articles.`,
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

export const creative = {
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
        href: '/gallery/older/dots/',
      },
      {
        title: 'Walkers',
        href: '/gallery/older/',
      },
      {
        title: 'Painter Walk',
        href: '/gallery/older/random_walker/',
      },
    ],

    'Archive ≈2016': [
      {
        title: '☆ Draw Walk ☆',
        href: '/gallery/p5js/draw_walk/',
      },
      {
        title: '☆ Cursor magic ☆',
        href: '/gallery/p5js/magic/',
      },
      {
        title: 'Flies',
        href: '/gallery/p5js/flies/',
      },
      {
        title: 'Flies Mouse Acceleration',
        href: '/gallery/p5js/flies-m-acc/',
      },
    ],

    After: [
      {
        title: 'Sound Terrain (FFT + Three.js)',
        href: 'http://joy.shapkarin.me',
      },
      {
        title: '3D first person demo',
        href: 'https://web.archive.org/web/20170325053311/http://new.shapkarin.me/',
      },
      {
        title: 'Pattern experiment',
        href: 'https://editor.p5js.org/yu.shapkarin/sketches/CBHJckI9b',
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
  return string.replace(/^\n/, '').replace(/ +/g, ' ').trim()
}
