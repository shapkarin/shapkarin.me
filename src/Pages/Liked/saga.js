import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchLikes } from 'Utils/API';
import liked from './routines';

function* getLiked(action) {
  yield fork(fetch, {
    action,
    method: fetchLikes,
    start: liked.request,
    success: liked.success,
    error: liked.failure
  });
}

export default function* () {
  yield take(liked.TRIGGER);
  yield fork(getLiked);
}
