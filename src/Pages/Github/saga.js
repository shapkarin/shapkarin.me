import { fork, takeEvery } from 'redux-saga/effects';

import fetch from 'Utils/fetch';
import { fetchGithub } from 'Utils/API';
import {
  loadRepositoriesStart,
  loadRepositoriesSuccess,
  loadRepositoriesError
} from './actions';
import { FETCH_REPOSITORIES } from './constants';


function* getRepositories(action) {
  yield fork(fetch, {
    action,
    method: fetchGithub,
    start: loadRepositoriesStart,
    succes: loadRepositoriesSuccess,
    error: loadRepositoriesError
  });
}

export default function* () {
  yield takeEvery(FETCH_REPOSITORIES, getRepositories);
}
