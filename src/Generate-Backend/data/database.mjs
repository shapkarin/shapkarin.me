export const about = {
  greeting: `Hello everyone!`,
  intro: clean(`
    My name is Yuri Shapkarin. 
    I am a software engineer with over a decade of experience and a solid foundation in Computer Science.
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
      'extend-saga-routines',
      'diff-browser-globals',
      'mermaid-render',
    ];
  },

  get database() {
    return {
      'extend-saga-routines': {
        title: 'Extend Routines',
        url: 'https://www.npmjs.com/package/extend-saga-routines',
        description: `
          Customizable action creator lib for any kind of actions. Note: There was no "createSlice" API in Redux Toolkit (RTK) in 2018 when this package was published + it doesn't relay on Redux`,
        badges: [ 'npm/v', 'npm/dy', 'npm/l' ]
      },
      'saga-fetch': {
        title: 'Saga Fetch',
        url: 'https://www.npmjs.com/package/saga-fetch',
        description: `
          Redux-Saga worker, created to simplify a fetch worker implementation.`,
        badges: [ 'npm/v', 'npm/dy', 'npm/l' ]
      },
      'diff-browser-globals': {
        title: 'Global diff (suspended)',
        url: 'https://github.com/shapkarin/diff-browser-globals',
        description: `
          Compare your window and browser default scopes.`,
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
    return this.order.map((name, id) => {
      const { title, url, description, badges = [] } = this.database[name];
      const descriptionCleared = clean(description);
      
      return {
        id,
        url,
        title,
        name,
        description: descriptionCleared,
        badges: this.toBadges(badges, name)
      }
    })
  },
}

const P5_GALLERY_PATH = '/gallery/p5js';
const OLD_GALLERY_PATH = `/gallery/older`;

export const creative = {
  title: 'A few of my creative coding artworks',
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
        href: `${OLD_GALLERY_PATH}/dots.html`,
      },
      {
        title: 'Walkers',
        href: OLD_GALLERY_PATH,
      },
      {
        title: 'Painter Walk',
        href: `${OLD_GALLERY_PATH}/random_walker.html`,
      },
    ],

    'Archive ≈2016': [
      {
        title: '☆ Draw Walk ☆',
        href: `${P5_GALLERY_PATH}/draw_walk.html`,
      },
      {
        title: '☆ Cursor magic ☆',
        href: `${P5_GALLERY_PATH}/magic`,
      },
      {
        title: 'Flies',
        href: `${P5_GALLERY_PATH}/flies`,
      },
      {
        title: 'Mouse Acceleration',
        href: `${P5_GALLERY_PATH}/flies-m-acc`,
      },
    ],

    After: [
      {
        title: '☆ latest (2022-24) ☆',
        href: 'https://github.com/shapkarin/shapkarin.me/wiki/Another-creative-codging-(js-only)',
      },
      {
        title: '☆ Sound Terrain ☆',
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
        title: 'My codepen profile',
        href: 'https://codepen.io/shapkarin',
      },
    ],
  }
}

function clean(string){
  return string.replace(/^\n/, '').replace(/ +/g, ' ').trim()
}
