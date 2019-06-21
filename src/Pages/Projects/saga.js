import {
  fork,
  all,
  put,
  call,
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
    error: projects.failure
  });
}

/*
  usually we have id in responce
  TODO: maybe rename to toggle
*/
function* getProjectInfo(action) {
  try {
    const { id, fetched } = action.payload;
    if (yield !fetched) {
      yield put(info.request({ id }));
      const { data } = yield call(fetchProjectInfo, action);
      yield put(info.success({ data, id }));
    }
    yield put(info.toggle({ id }));
  } catch (err) {
    yield put(info.failure(err));
  }
}

export default function* () {
  yield all([
    takeEvery(projects.TRIGGER, getProjects),
    takeLatest(info.TRIGGER, getProjectInfo)
  ]);
}
