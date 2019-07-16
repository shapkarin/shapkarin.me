export const projects = () => (
  [
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
    __html: 'Internet library for <a href="https://beeline.ru" target="_blank">Beeline</a>'
  }
};

export const projectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos[id];
};

export const about = "I like to code. Stack in production: React, Redux, Redux-Saga, Backbone, ROR, Koa, Webpack, Grunt, Gulp. Also used stylus, less, jade(pug), haml, twig, underscore, ejs.";
