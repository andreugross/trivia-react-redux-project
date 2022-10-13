import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Header from '../components/Header';
import { getApiTrivia } from '../services/triviaAPI';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      obj: {},
    };
  }

  async componentDidMount() {
    const { obj } = this.state;
    const token = localStorage.getItem('token');
    const data = await getApiTrivia(token);
    if (data.response_code === 0) {
      this.setState({ obj: data.results });
      console.log(obj);
    } else {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        GAME
        <Questions history={ history } />
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Game);
