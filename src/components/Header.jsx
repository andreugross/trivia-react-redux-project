import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    return (
      <header>
        <h1>teste</h1>
        <h1 data-testid="header-player-name">{ name }</h1>
        <h2 data-testid="header-score">{ score }</h2>
        <img
          src={ `https://www.gravatar.com/avatar/${MD5(email)}` }
          data-testid="header-profile-picture"
          alt="Imagem do perfil"
        />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.any,
  name: PropTypes.any,
  score: PropTypes.any,
}.isRequired;

mapStateToProps = (state) => ({
  gravatarEmail: state.player.email,
  score: state.player.score,
  name: state.player.name,
});

export default connect()(Header);
