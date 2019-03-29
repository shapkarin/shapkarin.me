import { all } from 'redux-saga/effects';

import aboutWorker from 'Components/About/saga';
import githubWorker from 'Pages/Github/saga';
import projectsWorker from 'Pages/Projects/saga';

export default function* rootSaga() {
  yield all([
    aboutWorker(),
    githubWorker(),
    projectsWorker()
  ]);
}
