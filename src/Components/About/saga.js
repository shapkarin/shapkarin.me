import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchAbout } from 'Common/API';
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
  const action = yield take(about.TRIGGER);
  yield getAbout(action);
}
