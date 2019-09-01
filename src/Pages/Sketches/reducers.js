import { handleActions } from 'redux-actions';

import sketches from './routines';

const initialState = {
  loading: false,
  catalog: {}
};

export default handleActions({
  [sketches.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [sketches.SUCCESS]: (state, { payload: catalog }) => ({
    ...state,
    catalog
  }),

  [sketches.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error
  }),

  [sketches.FULFILL]: state => ({
    ...state,
    loading: false
  })
},
initialState);
