import { combineReducers } from 'redux';
import player from './playerReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  player,
  gameReducer,
});

export default rootReducer;
