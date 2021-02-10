import { handleActions } from 'redux-actions';

import menu from './routines';

const initialState = {
  menu: []
};

export default handleActions({
  [menu.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [menu.SUCCESS]: (state, { payload: menu }) => ({
    ...state,
    menu
  }),

  [menu.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error
  }),

  [menu.FULFILL]: state => ({
    ...state,
    loading: false
  })
},
initialState);
