import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchAbout } from 'Utils/API';
import {
  loadAboutStart,
  loadAboutSuccess,
  loadAboutError
} from './actions';
import { FETCH_ABOUT } from './constants';


function* getAbout(action) {
  yield fork(fetch, {
    action,
    method: fetchAbout,
    start: loadAboutStart,
    success: loadAboutSuccess,
    error: loadAboutError
  });
}

export default function* () {
  yield take(FETCH_ABOUT);
  yield fork(getAbout);
}
