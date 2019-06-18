import { fork, takeEvery } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchLikes } from 'Utils/API';
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
  yield takeEvery(liked.TRIGGER, getLiked);
}
