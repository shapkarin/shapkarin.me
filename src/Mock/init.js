import MockAdapter from 'axios-mock-adapter';

import random from 'lodash/random';
import urls from 'Common/urls';

import {
  about,
  sketches,
  packages,
  getProjectInfo,
} from './data';

export default function(axios) {
  const mock = new MockAdapter(axios);
  const delay = () => random(200, 420);

  mock
    .onGet(urls.sketches)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, sketches]);
        }, delay());
      })
    ))

    .onGet(urls.packages)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, packages]);
        }, delay());
      })
    ))

    .onGet(urls.packageInfo)
    .reply(({ url }) => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, getProjectInfo(url)]);
        }, delay());
      })
    ))

    .onGet(urls.about)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, about]);
        }, delay());
      })
    ));
}
