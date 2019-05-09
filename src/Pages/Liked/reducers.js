import {
  LOAD_LIKED_START,
  LOAD_LIKED_SUCCESS,
  LOAD_LIKED_ERROR,
} from './constants';

const initialState = {
  loading: false,
  list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_LIKED_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_LIKED_SUCCESS:
      return {
        ...state,
        list: action.response,
        loading: false
      };
    case LOAD_LIKED_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
}
