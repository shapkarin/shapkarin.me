import {
  LOAD_ABOUT_START,
  LOAD_ABOUT_SUCCESS,
  LOAD_ABOUT_ERROR,
} from './constants';

const initialState = {
  loading: false,
  text: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_ABOUT_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_ABOUT_SUCCESS:
      return {
        ...state,
        text: action.response,
        loading: false
      };
    case LOAD_ABOUT_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
