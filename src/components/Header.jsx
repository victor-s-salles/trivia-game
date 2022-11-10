import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BtnGoHome from './BtnGoHome';

class Header extends React.Component {
  render() {
    const { name, score, image, history } = this.props;
    return (
      <div>
        <h1>Header</h1>
        <img
          src={ image }
          alt="Imagem de perfil do usuário "
          data-testid="header-profile-picture"
          width="100px"
        />
        <h3 date-testid="header-player-name">
          Nome:
          {' '}
          {name}
        </h3>
        <h4 date-testid="header-score">
          Score:
          {score}
        </h4>
        <BtnGoHome history={ history } />
      </div>
    );
  }
}

Header.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  name: globalState.playerReducer.name,
  score: globalState.playerReducer.score,
  image: globalState.playerReducer.image,
});
export default connect(mapStateToProps)(Header);
