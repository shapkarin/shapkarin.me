import MockAdapter from 'axios-mock-adapter';

import urls from './urls';

import {
  github,
  projects,
  projectInfo,
  about
} from './fakeData';

export default function (axios) {
  const mock = new MockAdapter(axios);
  const delay = 300;

  mock
    .onGet(urls.github)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, github()]);
        }, delay);
      })
    ))

    .onGet(urls.projects)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, projects()]);
        }, delay);
      })
    ))

    .onGet(urls.projectInfo)
    .reply(() => (
      new Promise((resolve) => {
        setTimeout(() => {
          resolve([200, projectInfo()]);
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
