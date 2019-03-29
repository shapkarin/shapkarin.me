import { combineReducers } from 'redux';

import aboutReducer from 'Components/About/reducers';
import githubReducer from 'Pages/Github/reducers';
import projectsReducer from 'Pages/Projects/reducers';

const rootReducer = combineReducers({
  about: aboutReducer,
  github: githubReducer,
  projects: projectsReducer
});

export default rootReducer;
