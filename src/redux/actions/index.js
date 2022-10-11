export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const ADD_INDEX = 'ADD_INDEX';
export const ADD_POINTS = 'ADD_POINTS';

export const submitLoginFormAction = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const addIndex = (index) => ({
  type: ADD_INDEX,
  index,
});

export const addPoints = (payload) => ({
  type: ADD_POINTS,
  payload,
});
