import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.verifyField);
  };

  verifyField = () => {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const nameMinLen = 3;
    const verifyName = name.length >= nameMinLen;
    this.setState({ isDisabled: !(verifyEmail && verifyName) });
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="login">
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play

        </button>
      </div>
    );
  }
}
export default connect()(Login);
