import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BtnSettings extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    return (
      <button
        type="button"
        data-testid="btn-settings"
        onClick={ this.handleClick }
      >
        Settings

      </button>
    );
  }
}

BtnSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default BtnSettings;
