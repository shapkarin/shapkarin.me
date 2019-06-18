import { handleActions } from 'redux-actions';

import about from './routines';

const initialState = {
  loading: false,
  text: ''
};

export default handleActions({
  [about.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [about.SUCCESS]: (state, { payload: text }) => ({
    ...state,
    text
  }),

  [about.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error
  }),

  [about.FULFILL]: state => ({
    ...state,
    loading: false
  })
},
initialState);
