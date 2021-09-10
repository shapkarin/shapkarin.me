import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchSketches } from 'Common/API';
import sketches from './routines';

function* getSketches(action) {
  yield fork(fetch, {
    action,
    method: fetchSketches,
    start: sketches.request,
    success: sketches.success,
    error: sketches.failure,
    fulfill: sketches.fulfill
  });
}

export default function* () {
  const action = yield take(sketches.TRIGGER);
  yield getSketches(action);
}
