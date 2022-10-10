import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestTriviaAPI } from '../services/triviaAPI';
import { submitLoginFormAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyButton());
  };

  verifyButton = () => {
    const { name, email } = this.state;
    return name.length > 0 && email.length > 0
      ? this.setState({ isDisabled: false })
      : this.setState({ isDisabled: true });
  };

  handleClick = async () => {
    const { submitLoginForm, history } = this.props;
    submitLoginForm(this.state);
    const data = await requestTriviaAPI();
    localStorage.setItem('token', data.token);
    history.push('/game');
  };

  onClickRedirect = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled, name, email } = this.state;
    return (
      <div>
        <form>
          <h1>Login</h1>
          <label htmlFor="nameInput">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="emailInput">
            <input
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ this.onClickRedirect }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  submitLoginForm: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submitLoginForm: (payload) => dispatch(submitLoginFormAction(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
