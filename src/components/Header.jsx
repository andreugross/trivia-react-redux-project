import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    return (
      <header>
        <h1>teste</h1>
        <h1 data-testid="header-player-name">{ name }</h1>
        <h2 data-testid="header-score">{ score }</h2>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          data-testid="header-profile-picture"
          alt="Imagem do perfil"
        />
      </header>
    );
  }
}

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  gravatarEmail: state.playerReducer.email,
  score: state.playerReducer.score,
  name: state.playerReducer.name,
});

export default connect(mapStateToProps)(Header);
