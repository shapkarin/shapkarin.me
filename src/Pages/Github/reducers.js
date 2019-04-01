import {
  LOAD_REPOSITORIES_START,
  LOAD_REPOSITORIES_SUCCESS,
  LOAD_REPOSITORIES_ERROR,
} from './constants';

const initialState = {
  loading: false,
  error: {
    message: '',
    code: 0
  },
  repositories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOSITORIES_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_REPOSITORIES_SUCCESS:
      return {
        ...state,
        repositories: action.response,
        loading: false
      };
    case LOAD_REPOSITORIES_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
