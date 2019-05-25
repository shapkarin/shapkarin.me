import about from './routines';

const initialState = {
  loading: false,
  text: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case about.REQUEST:
      return {
        ...state,
        loading: true
      };
    case about.SUCCESS:
      return {
        ...state,
        text: action.payload,
        loading: false
      };
    case about.FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
