import { SUBMIT_LOGIN } from '../actions';

const INITIAL_STATE = {

  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_LOGIN:
    console.log(action.payload);
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}

export default playerReducer;
