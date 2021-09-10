import { combineReducers } from 'redux';

import about from 'Components/About/reducers';
import github from 'Pages/Github/reducers';
import packages from 'Pages/Packages/reducers';
import liked from 'Pages/Liked/reducers';
import sketches from 'Pages/Sketches/reducers';

const rootReducer = combineReducers({
  about,
  github,
  packages,
  liked,
  sketches,
});

export default rootReducer;
