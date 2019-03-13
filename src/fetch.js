// example at https://gist.github.com/shapkarin/bc473e4d3f944a57ecb9b1ab2e3dc719
import { put, call } from 'redux-saga/effects';

export default function* fetch ({ action, method, start, succes, error }){
    try {
        yield put(start());
        const { data } = yield call(method, action);
        yield put(succes(data));
    } catch (err) {
        yield put(error(err));
    }
}
