import {
  fork,
  all,
  put,
  take,
  call,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchPackages, fetchPackageInfo } from 'Common/API';
import { packages, info } from './routines';

function* getPackages(action) {
  yield fork(fetch, {
    action,
    method: fetchPackages,
    start: packages.request,
    success: packages.success,
    error: packages.failure,
    fulfill: packages.fulfill
  });
}

function* getInfoOrToggle(action) {
  const { id, fetched } = action.payload;
  // todo: work around
  if (yield !fetched) {
    yield fork(fetch, {
      action,
      method: fetchPackageInfo,
      start: info.request,
      success: info.success,
      error: info.failure,
      fulfill: info.fulfill
    });
  }
  yield put(info.toggle({ id }));
}

export default function* () {
  const action = yield take(packages.TRIGGER);

  yield all([
    call(getPackages, action),
    takeLatest(info.TRIGGER, getInfoOrToggle)
  ]);
}
