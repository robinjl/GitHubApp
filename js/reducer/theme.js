import types from '../action/types';

const initState = {
  theme: 'blue',
};

export default function theme(state = initState, action) {
  switch (action.type) {
    case types.INIT_THEME:
      return initState;
    case types.CHANGE_THEME:
      return {
        ...state,
        theme: action.data,
      };
    default:
      return state;
  }
}
