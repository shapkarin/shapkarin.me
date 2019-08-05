import { handleActions } from 'redux-actions';
import { normalize, schema } from 'normalizr';

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
    const schem = new schema.Entity('collection');
    const { entities: { collection }, result: order } = normalize(payload, [schem]);

    return {
      ...state,
      data: {
        ...state.data,
        collection,
        order
      },
      loading: false
    };
  },

  [projects.FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  }),

  [info.TOGGLE]: (state, { payload: { id } }) => {
    const { data: { collection } } = state;
    const project = collection[id];

    return {
      ...state,
      data: {
        ...state.data,
        collection: {
          ...collection,
          [id]: {
            ...project,
            open: !project.open
          }
        }
      }
    };
  },

  // project info
  [info.REQUEST]: (state, { payload: { id } }) => {
    const { data: { collection } } = state;
    const project = collection[id];

    return {
      ...state,
      data: {
        ...state.data,
        collection: {
          ...collection,
          [id]: {
            ...project,
            loading: true
          }
        }
      }
    };
  },

  [info.SUCCESS]: (state, { payload }) => {
    const { id } = payload;
    const { data: { collection } } = state;
    const project = collection[id];

    return {
      ...state,
      data: {
        ...state.data,
        collection: {
          ...collection,
          [id]: {
            ...project,
            info: payload,
            fetched: true
          }
        }
      }
    };
  },

  [info.FULFILL]: (state, { payload: { id } }) => {
    const { data: { collection } } = state;
    const project = collection[id];

    return {
      ...state,
      data: {
        ...state.data,
        collection: {
          ...collection,
          [id]: {
            ...project,
            loading: false
          }
        }
      }
    };
  }
},
initialState);
