import { TIMER_OUT_TRUE, TIMER_OUT_FALSE, TIMER_UPDATE, TIME_MORE_30 } from '../actions';

const INITIAL_STATE = {
  timerOut: false,
  time: 30,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_OUT_TRUE:
    return {
      ...state,
      timerOut: true,
    };
  case TIMER_OUT_FALSE:
    return {
      ...state,
      timerOut: false,
    };
  case TIMER_UPDATE: return {
    ...state,
    time: action.seg,
  };
  case TIME_MORE_30: return {
    ...state,
    time: action.time,
  };
  default:
    return state;
  }
};

export default gameReducer;
