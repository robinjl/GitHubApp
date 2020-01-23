import { combineReducers } from 'redux';
import theme from './theme';
import popular from './popular';

export default combineReducers({
  theme,
  popular
});
