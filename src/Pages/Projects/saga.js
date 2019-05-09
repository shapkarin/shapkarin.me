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
import {
  loadProjectsStart,
  loadProjectsSuccess,
  loadProjectsError,
  loadProjectInfoStart,
  loadProjectInfoSuccess,
  loadProjectInfoError,
  toggleProjectInfo
} from './actions';
import {
  FETCH_PROJECTS,
  FETCH_PROJECT_INFO
} from './constants';

function* getProjects(action) {
  yield fork(fetch, {
    action,
    method: fetchProjects,
    start: loadProjectsStart,
    success: loadProjectsSuccess,
    error: loadProjectsError
  });
}

/*
  usually we have id in responce
  TODO: maybe rename to toggle
*/
function* getProjectInfo(action) {
  try {
    const { id, fetched } = action;
    if (yield !fetched) {
      yield put(loadProjectInfoStart(id));
      const { data } = yield call(fetchProjectInfo, action);
      yield put(loadProjectInfoSuccess(data, id));
    }
    yield put(toggleProjectInfo(id));
  } catch (err) {
    yield put(loadProjectInfoError(err));
  }
}

export default function* () {
  yield all([
    takeEvery(FETCH_PROJECTS, getProjects),
    takeLatest(FETCH_PROJECT_INFO, getProjectInfo)
  ]);
}
