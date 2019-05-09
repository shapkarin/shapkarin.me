import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchLikes } from 'Utils/API';
import {
  loadLikedStart,
  loadLikedSuccess,
  loadLikedError,
} from './actions';
import { FETCH_LIKED } from './constants';


function* getMockExamples(action) {
  yield fork(fetch, {
    action,
    method: fetchLikes,
    start: loadLikedStart,
    success: loadLikedSuccess,
    error: loadLikedError
  });
}

export default function* () {
  yield take(FETCH_LIKED);
  yield fork(getMockExamples);
}
