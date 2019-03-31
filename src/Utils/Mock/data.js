import faker from 'faker';
import random from 'lodash/random';

export const github = () => [
  {
    name: 'imba-todo',
    url: 'https://github.com/shapkarin/imba-todo'
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

export const projects = () => (
  [...Array(random(1, 25))].map(() => ({
    id: random(1000, 100000),
    name: faker.lorem.word(),
    url: faker.internet.url(),
  }))
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

export const projectInfo = () => faker.lorem.paragraph();

export const about = "Hello. It's nice to see you at my new home page.";
