import MockAdapter from 'axios-mock-adapter';

import urls from './urls';

import {
  github,
  projects,
  about
} from './fakeData';

export default function (axios) {
  const mock = new MockAdapter(axios);
  const delay = 500;

  mock
    .onGet(urls.github)
    .reply(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve([120, github()]);
        }, delay);
      });
    })

    .onGet(urls.projects)
    .reply(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve([120, projects()]);
        }, delay);
      });
    })

    .onGet(urls.about)
    .reply(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve([120, about]);
        }, delay);
      });
    });

}
