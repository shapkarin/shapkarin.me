import repositories from './routines';

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
    case repositories.REQUEST:
      return {
        ...state,
        loading: true
      };
    case repositories.SUCCESS:
      return {
        ...state,
        repositories: action.payload,
        loading: false
      };
    case repositories.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
