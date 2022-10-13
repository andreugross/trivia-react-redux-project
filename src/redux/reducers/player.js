import { SUBMIT_LOGIN, ADD_POINTS } from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_LOGIN:
    // console.log(action.payload);
    return {
      ...state,
      ...action.payload,
    };
  case ADD_POINTS:
    // console.log(action.payload);
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default player;
