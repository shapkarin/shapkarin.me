import faker from 'faker';
import random from 'lodash/random';

export const github = () => [
  {
    name: 'imba-todo',
    url: 'https://github.com/shapkarin/imba-todo'
  },
  {
    name: 'redux-scaffolder',
    url: 'https://github.com/shapkarin/redux-scaffolder'
  },
  {
    name: 'react-scaffolder',
    url: 'https://github.com/shapkarin/react-scaffolder'
  },
  {
    name: 'music-search',
    url: 'https://github.com/shapkarin/music-search'
  },
  {
    name: 'rijksmuseum',
    url: 'https://github.com/shapkarin/rijksmuseum'
  },
  {
    name: 'sketches',
    url: 'https://github.com/shapkarin/sketches'
  },
  {
    name: 'shapkarin.me',
    url: 'https://github.com/shapkarin/shapkarin.me'
  }
];

// export const projects = () => (
//   [...Array(random(1, 25))].map(() => ({
//     id: random(1000, 100000),
//     name: faker.lorem.word(),
//     url: faker.internet.url(),
//   }))
// );

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

const fakers = [faker.hacker.abbreviation, faker.commerce.product, faker.lorem.word];

export const mockExample = () => {
  const name = fakers[random(0, fakers.length - 1)];
  return (
    [...Array(random(10, 25))].map(() => ({
      id: random(1000, 100000),
      title: name()
    }))
  );
};

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

export const about = "I create different front-end and backend apps. Used different stack and from time to time research for some new. In production: React, Redux, Backbone, ROR, Koa, Webpack, Grunt, Gulp. Also used stylus, less, jade(pug), haml, twig, underscore, ejs.";
