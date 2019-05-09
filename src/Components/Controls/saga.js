import { debounce, take, fork } from 'redux-saga/effects';

import { CHANGE_BACKGROUND } from './constants';
import scene from '../Background';

function* changeBackg() {
  yield scene.randomizeAll();
  yield scene.draw();
}

export default function* () {
  yield debounce(200, CHANGE_BACKGROUND, changeBackg);
}
