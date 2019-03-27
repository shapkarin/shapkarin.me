import {
  fork,
  all,
  put,
  call,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import fetch from 'Utils/fetch';
import { fetchProjects, fetchProjectInfo } from 'Utils/API';
import {
  loadProjectsStart,
  loadProjectsSuccess,
  loadProjectsError,
  loadProjectInfoStart,
  loadProjectInfoSuccess,
  loadProjectInfoError
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
    succes: loadProjectsSuccess,
    error: loadProjectsError
  });
}

// TODO: usually we have id in responce
function* getProjectInfo(action) {
  try {
    const { id } = action;
    yield put(loadProjectInfoStart(id));
    const { data } = yield call(fetchProjectInfo, action);
    yield put(loadProjectInfoSuccess(data, id));
  } catch (err) {
    yield put(loadProjectsError(err));
  }
}

export default function* () {
  yield all([
    takeEvery(FETCH_PROJECTS, getProjects),
    takeLatest(FETCH_PROJECT_INFO, getProjectInfo)
  ]);
}
