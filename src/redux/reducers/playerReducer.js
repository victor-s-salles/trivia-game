import { CREATE_USER, SAVE_IMAGE, SCORE_SUM, PLAYER_RESET } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  image: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_USER: return {
    ...state,
    gravatarEmail: action.payload.email,
    name: action.payload.name,
  };
  case SAVE_IMAGE: return {
    ...state,
    image: action.payload,
  };
  case SCORE_SUM: return {
    ...state,
    score: state.score + action.score,
    assertions: state.assertions + 1,
  };
  case PLAYER_RESET: return {
    ...state,
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
    image: '',
  };
  default:
    return state;
  }
};

export default playerReducer;
