import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BtnGoHome from './BtnGoHome';
import gravatar from '../utils/gravatar';
import { saveImage } from '../redux/actions';

class FeedbackHeader extends React.Component {
  componentDidMount() {
    this.gravatarData();
  }

  gravatarData = () => {
    const { email, dispatch } = this.props;
    const img = gravatar(email);
    dispatch(saveImage(img));
  };

  render() {
    const { name, score, image, history } = this.props;
    return (
      <div>
        <img
          src={ image }
          alt="Imagem de perfil do usuário "
          data-testid="header-profile-picture"
          // width="200px"
        />
        <h3 data-testid="header-player-name">
          {name}
        </h3>
        <h4 data-testid="header-score">
          {score}
        </h4>
        <BtnGoHome history={ history } />
      </div>
    );
  }
}

FeedbackHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  email: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  score: globalState.player.score,
  image: globalState.player.image,
  email: globalState.player.gravatarEmail,
});
export default connect(mapStateToProps)(FeedbackHeader);
