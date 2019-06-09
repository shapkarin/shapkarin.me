import { handleActions } from 'redux-actions';
import { normalize, schema } from 'normalizr';

import {
  TOGGLE_PROJECT_INFO
} from './constants';
import { projects, info } from './routines';

const initialState = {
  loading: false,
  error: {
    message: '',
    code: 0
  },
  data: {},
};

export default handleActions({
  // projects
  [projects.REQUEST]: state => ({
    ...state,
    loading: true
  }),

  [projects.SUCCESS]: (state, { payload }) => {
    const schem = new schema.Entity('obj');
    const { entities: {obj: data} } = normalize(payload, [schem]);

    return {
      ...state,
      data,
      loading: false
    };
  },

  [projects.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  }),

  [TOGGLE_PROJECT_INFO]: (state, { payload: { id } }) => {
    const project = state.data[id];

    return {
      ...state,
      data: {
        ...state.data,
        [id]: {
          ...project,
          open: !project.open
        }
      }
    };
  },

  // project info
  [info.REQUEST]: (state, { payload: { id } }) => {
    const project = state.data[id];

    return {
      ...state,
      data: {
        ...state.data,
        [id]: {
          ...project,
          loading: true
        }
      }
    };
  },

  [info.SUCCESS]: (state, { payload: { id, data } }) => {
    const project = state.data[id];

    return {
      ...state,
      data: {
        ...state.data,
        [id]: {
          ...project,
          info: data,
          loading: false,
          fetched: true
        }
      }
    };
  }
},
initialState);
