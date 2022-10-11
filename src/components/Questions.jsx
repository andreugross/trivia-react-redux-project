import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getApiTrivia } from '../services/triviaAPI';

class Questions extends Component {
  state = {
    questions: [],
    indice: 0,
    isDisabled: false,
    isDisabledQuestions: false,
    answers: [],
    timer: 30,
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const perguntas = await getApiTrivia(token);
    // console.log(perguntas);
    this.setState({
      questions: perguntas.results,
    }, this.funcDePergunta);
    // console.log(perguntas);
    this.cronometro();
  }

  cronometro = () => {
    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(idInterval);
            this.setState({
              isDisabledQuestions: true,
            });
          }
        });
      }, second);
    });
  };

  funcDePergunta = () => {
    const { questions, indice } = this.state;
    const num = 0.5;
    // const answersOrder = [...questions[indice].incorrect_answers,
    //   questions[indice].correct_answer];
    const incorretas = questions[indice].incorrect_answers
      .map((a, i) => ({ name: a, isCorrect: false, dataTestId: `wrong-answer-${i}` }));
    const answersOrder = [{ name: questions[0].correct_answer,
      isCorrect: true,
      dataTestId: 'correct-answer' }, ...incorretas];
    const answersRandom = answersOrder.sort(() => Math.random() - num);
    // console.log(answersRandom, 'test');
    this.setState({
      answers: answersRandom,
    });
  };

  handleClick = () => {
    const { indice } = this.state;
    this.setState({ indice: indice + 1 });
    const tres = 3;
    if (indice === tres) {
      this.setState({
        isDisabled: true,
      });
    }
    this.funcDePergunta();
  };

  render() {
    const { questions,
      indice, isDisabled, answers, timer, isDisabledQuestions } = this.state;
    return (
      <div>
        <p>{ timer }</p>
        <div data-testid="question-text">{ questions[indice]?.question }</div>
        <div data-testid="question-category">{ questions[indice]?.category }</div>
        <div data-testid="answer-options">
          {
            answers.map((a, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ a.dataTestId }
                disabled={ isDisabledQuestions }
              >
                {a.name}
              </button>))
          }
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          NEXT
        </button>
      </div>
    );
  }
}

export default Questions;
