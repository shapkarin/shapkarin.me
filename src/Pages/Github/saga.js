import { fork, take, put, call } from 'redux-saga/effects';
import fetch from 'saga-fetch';

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
    success: loadRepositoriesSuccess,
    error: loadRepositoriesError
  });
}

export default function* () {
  yield take(FETCH_REPOSITORIES);
  yield fork(getRepositories);
}
