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

// TODO: use dufferent reducers and then combine
export default function (state = initialState, action) {
  switch (action.type) {
    case projects.REQUEST:
      return {
        ...state,
        loading: true
      };
    case projects.SUCCESS: {
      const schem = new schema.Entity('obj');
      const normalized = normalize(action.payload, [schem]);
      return {
        ...state,
        data: normalized.entities.obj,
        loading: false
      };
    }
    case projects.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case TOGGLE_PROJECT_INFO: {
      const { id } = action;
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
    }
    case info.REQUEST: {
      const { id } = action.payload;
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
    case info.SUCCESS: {
      const { id } = action.payload;
      const project = state.data[id];

      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...project,
            info: action.payload.data,
            loading: false,
            fetched: true
          }
        }
      };
    }
    default:
      return state;
  }
}
