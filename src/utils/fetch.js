import { put, call, fork, takeEvery } from 'redux-saga/effects';

import {
    loadSomeDataStart,
    loadSomeDataSucces,
    loadSomeDataError
} from './actions';

export default function* fetch ({ action, method, start, succes, error }){
    try {
        yield put(start());
        const { data } = yield call(method, action);
        yield put(succes(data));
    } catch (err) {
        yield put(error(err));
    }
}

// function* fetchSomeData (action) {
//     yield fork(fetch, {
//         action,
//         method: fetchSomeData,
//         start: loadSomeDataStart,
//         succes: loadSomeDataSucces,
//         error: loadSomeDataError
//     });
// }

// function* mySaga () {
//     yield takeEvery('GET_SOME_DATA', fetchSomeData);
// }