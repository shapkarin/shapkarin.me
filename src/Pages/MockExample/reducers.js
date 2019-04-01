import {
  LOAD_MOCK_EXAMPLE_START,
  LOAD_MOCK_EXAMPLE_SUCCESS,
  LOAD_MOCK_EXAMPLE_ERROR,
} from './constants';

const initialState = {
  loading: false,
  list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_MOCK_EXAMPLE_START:
      return {
        ...state,
        loading: true,
        error: initialState.error
      };
    case LOAD_MOCK_EXAMPLE_SUCCESS:
      return {
        ...state,
        list: action.response,
        loading: false
      };
    case LOAD_MOCK_EXAMPLE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
