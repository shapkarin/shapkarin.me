import { fork, takeLatest } from 'redux-saga/effects';

import { fetchGithub } from 'Utils/API';

import {
  loadRepositoriesStart,
  loadRepositoriesSuccess,
  loadRepositoriesError
} from './actions';

import { FETCH_REPOSITORIES } from './constants';

import fetch from 'Utils/fetch';

function* getRepositories(action) {
  yield fork(fetch, {
    action,
    method: fetchGithub,
    start: loadRepositoriesStart,
    succes: loadRepositoriesSuccess,
    error: loadRepositoriesError
  });
}

export default function* mySaga () {
  yield takeLatest(FETCH_REPOSITORIES, getRepositories);
}
