import { put, call } from 'redux-saga/effects';

export default function* fetch({
  action, method, start, succes, error
}) {
  try {
    yield put(start());
    const { data } = yield call(method, action);
    yield put(succes(data));
  } catch (err) {
    yield put(error(err));
  }
}
