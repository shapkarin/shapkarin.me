import { fork, take, put, call } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchGithub } from 'Utils/API';
import {
  loadRepositoriesStart,
  loadRepositoriesSuccess,
  loadRepositoriesError
} from './actions';
import { FETCH_REPOSITORIES } from './constants';



function* fetch2({
  action, method, start, success, error
}) {
  try {
    yield put(start());
    const response = yield call(method, action);
    let data;
    // if not it's window.fetch()
    if(yield response.data === undefined){
      data = yield response.json();
    // if it's axios
    } else {
      data = yield response.data;
    }
    yield put(success(data));
  } catch (err) {
    yield put(error(err));
  }
}

function* getRepositories(action) {
  yield fork(fetch2, {
    action,
    method: fetchGithub,
    start: loadRepositoriesStart,
    success: loadRepositoriesSuccess,
    error: loadRepositoriesError
  });
}

export default function* () {
  yield take(FETCH_REPOSITORIES);
  yield fork(getRepositories);
}
