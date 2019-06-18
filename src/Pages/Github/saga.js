import { fork, takeEvery } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchGithub } from 'Utils/API';
import repositories from './routines';

function* getRepositories(action) {
  yield fork(fetch, {
    action,
    method: fetchGithub,
    start: repositories.request,
    success: repositories.success,
    error: repositories.failure,
    fulfill: repositories.fulfill
  });
}

export default function* () {
  yield takeEvery(repositories.TRIGGER, getRepositories);
}
