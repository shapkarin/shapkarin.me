import { combineReducers } from 'redux';

import githubReducer from 'Pages/Github/reducers';
import projectsReducer from 'Pages/Projects/reducers';

const rootReducer = combineReducers({
  github: githubReducer,
  projects: projectsReducer
});

export default rootReducer;
