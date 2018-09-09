import {
  FETCH_VEGETABLES_REQUEST,
  FETCH_VEGETABLES_SUCCESS,
  FETCH_VEGETABLES_ERROR
} from '../actions/vegetables'

const initialState = {
  data: [],
  error: null,
  loading: false
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_VEGETABLES_REQUEST) {
    return Object.assign({}, state, {
        loading: true,
        error: null
    });
  } else if (action.type === FETCH_VEGETABLES_SUCCESS) {
      return Object.assign({}, state, {
          data: action.data,
          error: null
      });
  } else if (action.type === FETCH_VEGETABLES_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
}