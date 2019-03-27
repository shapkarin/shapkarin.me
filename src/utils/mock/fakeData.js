import faker from 'faker';
import random from 'lodash/random';

export const github = () => (
  [...Array(random(1, 25))].map(() => ({
    id: random(1000,100000),
    name: faker.hacker(),
    url: faker.url(),
  }))
);

export const projects = () => (
  [...Array(random(1, 25))].map(() => ({
    projectName: faker.hacker(),
    url: faker.url(),
  }))
);

export const about = 'Some info about me';
