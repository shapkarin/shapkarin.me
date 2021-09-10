import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchLikes } from 'Common/API';
import liked from './routines';

function* getLiked(action) {
  yield fork(fetch, {
    action,
    method: fetchLikes,
    start: liked.request,
    success: liked.success,
    error: liked.failure,
    fulfill: liked.fulfill
  });
}

export default function* () {
  const action = yield take(liked.TRIGGER);
  yield getLiked(action);
}
