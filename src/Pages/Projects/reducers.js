import {
  LOAD_PROJECTS_START,
  LOAD_PROJECTS_SUCCESS,
  LOAD_PROJECTS_ERROR,
  LOAD_PROJECT_INFO_START,
  LOAD_PROJECT_INFO_SUCCESS,
  LOAD_PROJECT_INFO_ERROR
} from './constants';

const initialState = {
  loading: false,
  error: {
    message: '',
    code: 0
  },
  projects: {},
};

// TODO: maybe use dufferent reducers and then combine
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PROJECTS_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.response,
        loading: false
      };
    case LOAD_PROJECTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case LOAD_PROJECT_INFO_SUCCESS: {
      const { id } = action;
      const project = state.projects.id;
      return {
        ...state,
        projects: {
          ...state.projects,
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
