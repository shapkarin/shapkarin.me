import { combineReducers } from 'redux';

import aboutReducer from 'Components/About/reducers';
import githubReducer from 'Pages/Github/reducers';
import projectsReducer from 'Pages/Projects/reducers';
import mockExampleReducer from 'Pages/Liked/reducers';

const rootReducer = combineReducers({
  about: aboutReducer,
  github: githubReducer,
  projects: projectsReducer,
  example: mockExampleReducer
});

export default rootReducer;
