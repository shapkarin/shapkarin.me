import { combineReducers } from 'redux';

import aboutReducer from 'Components/About/reducers';
import githubReducer from 'Pages/Github/reducers';
import projectsReducer from 'Pages/Projects/reducers';
import likedReducer from 'Pages/Liked/reducers';
import sketchesReducer from 'Pages/Sketches/reducers';

const rootReducer = combineReducers({
  about: aboutReducer,
  github: githubReducer,
  projects: projectsReducer,
  liked: likedReducer,
  sketches: sketchesReducer
});

export default rootReducer;
