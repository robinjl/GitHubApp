import types from './types';

export function changeTheme(theme){
  return {
    type: types.CHANGE_THEME,
    data: theme
  }
}

export function intiTheme(){
  return {
    type: types.INIT_THEME
  }
}
