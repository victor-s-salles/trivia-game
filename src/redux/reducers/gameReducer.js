import { TIMER_OUT_TRUE, TIMER_OUT_FALSE } from '../actions';

const INITIAL_STATE = {
  timerOut: false,
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
  default:
    return state;
  }
};

export default gameReducer;
