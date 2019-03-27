import { all } from 'redux-saga/effects';

import githubWorker from './Pages/Github/saga';
// import projectsWorker from './Pages/Projects/saga';

export default function* rootSaga() {
  yield all([
    githubWorker(),
    // projectsWorker(),
  ]);
}
