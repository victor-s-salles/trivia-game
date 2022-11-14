import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BtnPlayAgain extends Component {
  goToStart = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ this.goToStart }
      >
        Play Again
      </button>
    );
  }
}

BtnPlayAgain.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BtnPlayAgain;
