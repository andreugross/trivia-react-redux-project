import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getApiTrivia } from '../services/triviaAPI';

class Questions extends Component {
  state = {
    questions: [],
    indice: 0,
    isDisabled: false,
    isDisabledQuestions: false,
    answers: [],
    timer: 30,
    hasButton: false,
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
    const quatro = 4;
    const { history } = this.props;
    // if (indice === tres) {
    //   this.setState({
    //     isDisabled: true,
    //   });
    // }
    this.funcDePergunta();
    this.setState({
      timer: 30,
    });
    if (indice === quatro) {
      history.push('/feedback');
    }
  };

  handleClickAnswer = () => {
    // const { hasButton } = this.state;
    this.setState({
      hasButton: true,
    });
  };

  render() {
    const { questions,
      indice, isDisabled, answers, timer, isDisabledQuestions, hasButton } = this.state;
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
                onClick={ this.handleClickAnswer }
              >
                {a.name}
              </button>))
          }
        </div>
        {
          hasButton && (
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ isDisabled }
              data-testid="btn-next"
            >
              NEXT
            </button>
          )
        }
        {/* <button
          type="button"
          onClick={ this.handleClick }
          disabled={ isDisabled }
          data-testid="btn-next"
        >
          NEXT
        </button> */}
      </div>
    );
  }
}

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Questions;
