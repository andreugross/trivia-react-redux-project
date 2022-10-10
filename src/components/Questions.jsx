import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { getApiTrivia } from '../services/triviaAPI';

class Questions extends Component {
  state = {
    questions: [],
    indice: 0,
    isDisabled: false,
    answers: [],
  };

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const perguntas = await getApiTrivia(token);
    // console.log(perguntas);
    this.setState({
      questions: perguntas.results,
    }, this.funcDePergunta);
    // console.log(perguntas);
  }

  funcDePergunta = () => {
    const { questions, indice } = this.state;
    const num = 0.5;
    const answersOrder = [...questions[indice].incorrect_answers,
      questions[indice].correct_answer];
    const answersRandom = answersOrder.sort(() => Math.random() - num);
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
    const { questions, indice, isDisabled, answers } = this.state;
    return (
      <div>
        <div data-testid="question-text">{ questions[indice]?.question }</div>
        <div data-testid="question-category">{ questions[indice]?.category }</div>
        <div data-testid="answer-options">
          {
            answers === 2
              ? (
                <div>
                  <button type="button" data-testid="correct-answer">{answers[0]}</button>
                  <button
                    type="button"
                    data-testid="wrong-answer-1"
                  >
                    {answers[1]}

                  </button>
                </div>)
              : (answers.map((a, index) => (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                >
                  {a}
                </button>)))
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
