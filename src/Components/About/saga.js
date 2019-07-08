import { fork, takeEvery } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchAbout } from 'Utils/API';
import about from './routines';

function* getAbout(action) {
  yield fork(fetch, {
    action,
    method: fetchAbout,
    start: about.request,
    success: about.success,
    error: about.failure,
    fulfill: about.fulfill
  });
}

export default function* () {
  yield takeEvery(about.TRIGGER, getAbout);
}
