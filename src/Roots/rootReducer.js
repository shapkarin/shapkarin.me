import { combineReducers } from 'redux';

import aboutReducer from 'Components/About/reducers';
import githubReducer from 'Pages/Github/reducers';
import projectsReducer from 'Pages/Projects/reducers';
import likedReducer from 'Pages/Liked/reducers';
import sketchesReducer from 'Pages/Sketches/reducers';
import menuReducer from 'Components/Menu/reducers';

const rootReducer = combineReducers({
  about: aboutReducer,
  github: githubReducer,
  projects: projectsReducer,
  liked: likedReducer,
  sketches: sketchesReducer,
  menu: menuReducer,
});

export default rootReducer;
