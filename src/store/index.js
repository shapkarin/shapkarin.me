import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../Roots/rootReducer';
import rootSaga from '../Roots/rootSaga';

const DEBUG = process.env.NODE_ENV !== 'production';

const composeEnhancers = DEBUG && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;

const sagaMiddleware = createSagaMiddleware();

function configureStore() {
  const store = compose(
    applyMiddleware(thunkMiddleware),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )(createStore)(rootReducer);

  sagaMiddleware.run(rootSaga);

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(rootReducer);
  //   });
  // }

  return store;
}

export default configureStore();
