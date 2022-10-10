const URL = 'https://opentdb.com/api_token.php?command=request';

export const requestTriviaAPI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const getApiTrivia = async (token) => {
  const questions = 5;
  const API = `https://opentdb.com/api.php?amount=${questions}&token=${token}`;
  const response = await fetch(API);
  const data = await response.json();
  // console.log('test', data);
  return data;
};

// getApiTrivia();
