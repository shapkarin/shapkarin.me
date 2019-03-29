import { fork, takeEvery } from 'redux-saga/effects';

import fetch from 'Utils/fetch';
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
    succes: loadAboutSuccess,
    error: loadAboutError
  });
}

export default function* () {
  yield takeEvery(FETCH_ABOUT, getAbout);
}
