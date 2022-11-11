import { CREATE_USER, SAVE_IMAGE } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
