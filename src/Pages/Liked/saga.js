import { fork, takeEvery } from 'redux-saga/effects';
import fetch from 'saga-fetch';

import { fetchLikes } from 'Utils/API';
import {
  loadMockExampleStart,
  loadMockExampleSuccess,
  loadMockExampleError,
} from './actions';
import { FETCH_MOCK_EXAMPLE } from './constants';


function* getMockExamples(action) {
  yield fork(fetch, {
    action,
    method: fetchLikes,
    start: loadMockExampleStart,
    success: loadMockExampleSuccess,
    error: loadMockExampleError
  });
}

export default function* () {
  yield takeEvery(FETCH_MOCK_EXAMPLE, getMockExamples);
}
