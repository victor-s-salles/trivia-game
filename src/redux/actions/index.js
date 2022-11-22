export const CREATE_USER = 'CREATE_USER';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const TIMER_OUT_TRUE = 'TIMER_OUT_TRUE';
export const TIMER_OUT_FALSE = 'TIMER_OUT_FALSE';
export const TIMER_UPDATE = 'TIMER_UPDATE';
export const SCORE_SUM = 'SCORE_SUM';
export const TIME_MORE_30 = 'TIME_MORE_30';
export const PLAYER_RESET = 'PLAYER_RESET';
export const TIME_MENOS_UM = 'TIME_MENOS_UM';
export const createUser = (payload) => ({
  type: CREATE_USER,
  payload,
});
export const saveImage = (payload) => ({
  type: SAVE_IMAGE,
  payload,
});
export const timerOutTrue = () => ({
  type: TIMER_OUT_TRUE,
});

export const timerOutFalse = () => ({
  type: TIMER_OUT_FALSE,
});
export const scoreSum = (score) => ({
  type: SCORE_SUM,
  score,
});
export const timeMore30 = (time) => ({
  type: TIME_MORE_30,
  time,
});
export const playerReset = () => ({
  type: PLAYER_RESET,
});
export const timeMenosUm = () => ({
  type: TIME_MENOS_UM,
});
