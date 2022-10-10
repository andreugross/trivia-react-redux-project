import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
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
    return (
      <div>
        GAME
        <Questions />
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
