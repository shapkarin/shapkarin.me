import {
  fork,
  all,
  put,
  take,
  call,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchProjects, fetchProjectInfo } from 'Utils/API';
import { projects, info } from './routines';

function* getProjects(action) {
  yield fork(fetch, {
    action,
    method: fetchProjects,
    start: projects.request,
    success: projects.success,
    error: projects.failure,
    fulfill: projects.fulfill
  });
}

function* getProjectInfoOrToggle(action) {
  const { id, fetched } = action.payload;
  if (yield !fetched) {
    yield fork(fetch, {
      action,
      method: fetchProjectInfo,
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
    takeEvery(projects.TRIGGER, getProjects),
    takeLatest(info.TRIGGER, getProjectInfoOrToggle)
  ]);
}
