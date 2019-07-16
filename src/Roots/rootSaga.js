import { all } from 'redux-saga/effects';

import aboutWorker from 'Components/About/saga';
import RandomButtonWorker from 'Components/RandomButton/saga';
import githubWorker from 'Pages/Github/saga';
import projectsWorker from 'Pages/Projects/saga';
import likedWorker from 'Pages/Liked/saga';

export default function* rootSaga() {
  yield all([
    aboutWorker(),
    githubWorker(),
    likedWorker(),
    projectsWorker(),
    RandomButtonWorker()
  ]);
}
