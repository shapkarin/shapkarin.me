import faker from 'faker';
import random from 'lodash/random';

export const github = () => (
  [...Array(random(5, 25))].map(() => ({
    id: random(1000, 100000),
    name: faker.hacker.adjective(),
    url: faker.internet.url(),
  }))
);

export const projects = () => (
  [...Array(random(1, 25))].map(() => ({
    id: random(1000, 100000),
    name: faker.lorem.word(),
    url: faker.internet.url(),
  }))
);

export const projectInfo = () => faker.lorem.paragraph();

export const about = 'Some info about me';
