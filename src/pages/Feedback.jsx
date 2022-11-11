import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    if (assertions < THREE) {
      return (
        <div>
          <h2 data-testid="feedback-text">Could be better...</h2>
          <p data-testid="feedback-total-question">
            Você acertou
            <span>{` ${assertions}`}</span>
            {assertions.length === 1 ? ' questão!' : ' questões!'}
          </p>

          <p data-testid="feedback-total-score">
            Um total de
            <span>{` ${score}`}</span>
            {score.length === 1 ? ' ponto!' : ' pontos!'}
          </p>
        </div>
      );
    }

    if (assertions >= THREE) {
      return (
        <div>
          <h2 data-testid="feedback-text">Well Done!</h2>
          <p data-testid="feedback-total-question">
            Você acertou
            <span>{` ${assertions}`}</span>
            {assertions.length === 1 ? ' questão!' : ' questões!'}
          </p>

          <p data-testid="feedback-total-score">
            Um total de
            <span>{` ${score}`}</span>
            {score.length > 1 ? ' pontos!' : ' ponto!'}
          </p>
        </div>
      );
    }
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
};

const mapStateToProps = (state) => ({
  assertions: state.playerReducer.assertions,
  score: state.playerReducer.score,
});

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
};

export default connect(mapStateToProps)(Feedback);
