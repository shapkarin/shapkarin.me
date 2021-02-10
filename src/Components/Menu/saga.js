import { fork, take } from 'redux-saga/effects';
import fetch from 'saga-fetch';
import { createRoutine } from 'redux-saga-routines';

import { fetchMenu } from 'Utils/API';
import about from './routines';

const menu = createRoutine('about');

function* getAbout(action) {
  yield fork(fetch, {
    action,
    method: fetchMenu,
    start: menu.request,
    success: menu.success,
    error: menu.failure,
    fulfill: menu.fulfill
  });
}

export default function* () {
  const action = yield take(menu.TRIGGER);
  yield getAbout(action);
}
