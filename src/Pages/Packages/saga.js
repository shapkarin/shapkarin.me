import {
  fork,
  all,
  put,
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
  yield all([
    takeEvery(packages.TRIGGER, getPackages),
    takeLatest(info.TRIGGER, getInfoOrToggle)
  ]);
}
