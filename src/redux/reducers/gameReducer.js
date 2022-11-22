import {
  TIMER_OUT_TRUE, TIMER_OUT_FALSE, TIME_MORE_30, TIME_MENOS_UM,
} from '../actions';

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
  case TIME_MORE_30: return {
    ...state,
    time: action.time,
  };
  case TIME_MENOS_UM: return {
    ...state,
    time: state.time - 1,
  };
  default:
    return state;
  }
};

export default gameReducer;
