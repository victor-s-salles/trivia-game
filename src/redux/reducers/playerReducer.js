import { CREATE_USER } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
