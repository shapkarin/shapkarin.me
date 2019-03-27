import {
  LOAD_PROJECTS_START,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
  LOAD_PROJECT_INFO_START,
  LOAD_PROJECT_INFO_SUCCESS,
  LOAD_PROJECT_INFO_ERROR
} from './constants';

import { normalize, schema } from 'normalizr';

const initialState = {
  loading: false,
  error: {
    message: '',
    code: 0
  },
  data: {},
};

// TODO: use dufferent reducers and then combine
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_PROJECTS_SUCCESS: {
      const schem = new schema.Entity('obj');
      const normalized = normalize(action.response, [schem]);
      return {
        ...state,
        data: normalized.entities.obj,
        loading: false
      };
    }
    case LOAD_PROJECTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case LOAD_PROJECT_INFO_START: {
      const { id } = action;
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
    }
    case LOAD_PROJECT_INFO_SUCCESS: {
      const { id } = action;
      const project = state.data[id];

      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...project,
            info: action.response,
            loading: false
          }
        }
      };
    }
    default:
      return state;
  }
}
