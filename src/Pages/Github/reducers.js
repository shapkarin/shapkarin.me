import { handleActions } from 'redux-actions';

import repositories from './routines';

const initialState = {
  loading: false,
  error: {
    message: '',
    code: 0
  },
  repositories: [],
};

export default handleActions({
  [repositories.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [repositories.SUCCESS]: (state, { payload }) => ({
    ...state,
    repositories: payload
  }),

  [repositories.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error
  }),

  [repositories.FULFILL]: state => ({
    ...state,
    loading: false
  })
},
initialState);
