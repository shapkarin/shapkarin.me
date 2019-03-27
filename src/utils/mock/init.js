import MockAdapter from 'axios-mock-adapter';

import urls from './urls';

import {
  github,
  projects,
  about,
} from './fakeData';

export default function (axios) {
  const mock = new MockAdapter(axios);
  const delay = 300;

  mock
    .onGet(urls.github)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([120, github()]);
        }, delay);
      })
    ))

    .onGet(urls.projects)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([120, projects()]);
        }, delay);
      })
    ))

    .onGet(urls.about)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([120, about]);
        }, delay);
      })
    ));
}
