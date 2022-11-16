import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BtnRanking extends Component {
  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ this.goToRanking }
      >
        Ranking
      </button>
    );
  }
}

BtnRanking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default BtnRanking;
