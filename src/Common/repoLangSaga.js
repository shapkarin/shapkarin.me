import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';
import { createRoutine } from 'redux-saga-routines';

import { fetchRepoLangs } from './API';

export const langs = createRoutine('repositories');

function* getLanguages(action) {
  yield fork(fetch, {
    action,
    method: fetchRepoLangs(action.url),
    start: langs.request,
    success: langs.success,
    error: langs.failure,
    fulfill: langs.fulfill
  });
}

export default function* () {
  const action = yield take(langs.TRIGGER);
  yield getLanguages(action);
}
