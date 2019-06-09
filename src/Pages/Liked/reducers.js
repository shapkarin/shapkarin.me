import { handleActions } from 'redux-actions';

import liked from './routines';

const initialState = {
  loading: false,
  list: []
};

export default handleActions({
  [liked.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [liked.SUCCESS]: (state, { payload: list }) => ({
    ...state,
    list,
    loading: false
  }),

  [liked.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  })
},
initialState);
