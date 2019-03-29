import { fork, takeEvery } from 'redux-saga/effects';

import fetch from 'Utils/fetch';
import { fetchMockExample } from 'Utils/API';
import {
  loadMockExampleStart,
  loadMockExampleSuccess,
  loadMockExampleError,
} from './actions';
import { FETCH_MOCK_EXAMPLE } from './constants';


function* getRepositories(action) {
  yield fork(fetch, {
    action,
    method: fetchMockExample,
    start: loadMockExampleStart,
    succes: loadMockExampleSuccess,
    error: loadMockExampleError
  });
}

export default function* () {
  yield takeEvery(FETCH_MOCK_EXAMPLE, getRepositories);
}
