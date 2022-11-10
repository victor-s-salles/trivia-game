import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BtnGoHome extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.handleClick }
      >
        Go Home!

      </button>
    );
  }
}

BtnGoHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BtnGoHome;
