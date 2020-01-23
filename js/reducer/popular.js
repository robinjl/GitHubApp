import types from '../action/types';

const initState = {};

export default function popular(state = initState, action) {
  switch (action.type) {
    case types.POPULAR_FETCH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          loading: true,
          hideLoadingMore: true
        }
      };
    case types.POPULAR_FETCH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          originData: action.originData,
          data: action.data,
          pageNumber: action.pageNumber,
          loading: false,
          hideLoadingMore: false
        }
      };
    case types.POPULAR_FETCH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          loading: false,
          error: action.error
        }
      };
    case types.POPULAR_FETCH_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          data: action.data,
          hideLoadingMore: false,
          pageNumber: action.pageNumber
        }
      };
    case types.POPULAR_FETCH_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          error: action.error,
          hideLoadingMore: true,
          pageNumber: action.pageNumber
        }
      };
    default:
      return state;
  }
}
