import React from 'react';
// import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

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
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
