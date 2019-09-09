import MockAdapter from 'axios-mock-adapter';

import urls from 'Utils/urls';

import {
  about,
  sketches,
  projects,
  getProjectInfo,
} from './data';

export default function (axios) {
  const mock = new MockAdapter(axios);
  const delay = 300;

  mock
    .onGet(urls.sketches)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, sketches]);
        }, delay);
      })
    ))

    .onGet(urls.projects)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, projects]);
        }, delay);
      })
    ))

    .onGet(urls.projectInfo)
    .reply(({ url }) => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, getProjectInfo(url)]);
        }, delay);
      })
    ))

    .onGet(urls.about)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, about]);
        }, delay);
      })
    ));
}
