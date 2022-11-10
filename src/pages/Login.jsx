import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import BtnSettings from '../components/BtnSettings';

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

  getTokenForPlayer = async () => {
    const { history } = this.props;
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const tokenOfPlayer = data.token;

    localStorage.setItem('token', tokenOfPlayer);
    history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    const { history } = this.props;
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
          onClick={ this.getTokenForPlayer }
        >
          Play

        </button>
        <BtnSettings history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Login);
