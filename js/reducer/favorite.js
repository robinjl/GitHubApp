import types from '../action/types';

const initState = {};

export default function favorite(state = initState, action) {
  switch (action.type) {
    case types.FAVORITE_FETCH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          loading: true,
        }
      };
    case types.FAVORITE_FETCH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          data: action.data,
          loading: false,
        }
      };
    case types.FAVORITE_FETCH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          loading: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}
