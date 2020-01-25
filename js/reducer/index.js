import { combineReducers } from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './trending';

export default combineReducers({
  theme,
  popular,
  trending
});
