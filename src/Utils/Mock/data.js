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
      name: 'other',
      url: ''
    }
  ]
);

const infos = {
  1: {
    __html: 'App to buy tickets for events(shows, theaters, music concerts). \
    As example, while API is not ready for development I mock requests with \
    axios-mock-adapter to fake responses and then I just disable mocks and \
    app uses real data. Also implement data fetching in \
    <a href="https://gist.github.com/shapkarin/bc473e4d3f944a57ecb9b1ab2e3dc719" taget="_blank">that common way </a> and also \
    <a href="https://gist.github.com/shapkarin/5dfb7dd134fca1e51fdcef1fd24a8adf">close saga worker with closure of request</a> \
    so for example I can easily implement an autocomplete that uses sagas takeLatest() \
    <br/> \
    react, redux, redux-saga, normalizr, axios, axios-mock-adapter, \
    webpack, jest, webpack SVG sprites, git hooks and etc'
  },
  2: {
    __html: 'Internet library'
  },
  3: {
    __html: 'TODO: add more'
  }
};

export const projectInfo = (url) => {
  const [id] = url.match(/[^/]+$/);
  return infos[id];
};

export const about = "I like to code. Stack in production: React, Redux, Redux-Saga, Backbone, ROR, Koa, Webpack, Grunt, Gulp. Also used stylus, less, jade(pug), haml, twig, underscore, ejs.";
