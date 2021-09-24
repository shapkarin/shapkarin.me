import MockAdapter from 'axios-mock-adapter';

import random from 'lodash.random';
import urls from './urls';

import {
  about,
  sketches,
  packages,
  getProjectInfoByUrl,
} from './database';

export default function(axios) {
  const mock = new MockAdapter(axios);
  const delay = () => random(142, 420);

  mock
    .onGet(urls.about)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, about]);
        }, delay());
      })
    ))

    .onGet(urls.sketches)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, sketches]);
        }, delay());
      })
    ))

    .onGet(urls.packages._root)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, packages._root]);
        }, delay());
      })
    ))

    .onGet(urls.packages.package())
    .reply(({ url }) => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, getProjectInfoByUrl(url)]);
        }, delay());
      })
    ))
}
