export const projects = () => (
  [
    {
      id: 1,
      name: 'Redkassa widget',
      url: ''
    },
    {
      id: 2,
      name: 'Books.beeline.ru',
      url: ''
    },
    {
      id: 3,
      name: 'Other',
      url: ''
    }
  ]
);

const infos = {
  1: {
    __html: 'App to buy tickets for events: shows, theaters, music concerts, etc. \
    <br/> \
    stack: react, redux, redux-saga, normalizr, axios, axios-mock-adapter, \
    webpack, jest, webpack SVG sprites, git hooks and etc'
  },
  2: {
    __html: 'Internet library'
  },
  3: {
    __html: 'TODO: someday add more'
  }
};

export const projectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos[id];
};

export const about = "I like to code. Stack in production: React, Redux, Redux-Saga, Backbone, ROR, Koa, Webpack, Grunt, Gulp. Also used stylus, less, jade(pug), haml, twig, underscore, ejs.";
