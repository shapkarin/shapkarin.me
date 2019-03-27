import { combineReducers } from 'redux';

import githubReducer from 'Pages/Github/reducers';

const rootReducer = combineReducers({
  github: githubReducer
});

export default rootReducer;
