import { combineReducers } from 'redux';
import timer from './timer';
import setting from './setting';

const rootReducer = combineReducers({
  timer,
  setting,
});

export default rootReducer;
