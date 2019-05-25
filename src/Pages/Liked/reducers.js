import liked from './routines';

const initialState = {
  loading: false,
  list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case liked.REQUEST:
      return {
        ...state,
        loading: true
      };
    case liked.SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case liked.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
