import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BtnPlayAgain from '../components/BtnPlayAgain';
import BtnRanking from '../components/BtnRanking';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const THREE = 3;
    if (assertions < THREE) {
      return (
        <div>
          <Header />
          <h2 data-testid="feedback-text">Could be better...</h2>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{` ${assertions}`}</span>
            {assertions.length === 1 ? ' questão!' : ' questões!'}
          </p>

          <p>
            Um total de
            <span data-testid="feedback-total-score">{` ${score}`}</span>
            {score.length === 1 ? ' ponto!' : ' pontos!'}
          </p>
          <BtnPlayAgain history={ history } />
          <BtnRanking history={ history } />
        </div>
      );
    }

    if (assertions >= THREE) {
      return (
        <div>
          <Header />
          <h2 data-testid="feedback-text">Well Done!</h2>
          <p>
            Você acertou
            <span data-testid="feedback-total-question">{` ${assertions}`}</span>
            {assertions.length === 1 ? ' questão!' : ' questões!'}
          </p>

          <p>
            Um total de
            <span data-testid="feedback-total-score">{` ${score}`}</span>
            {score.length > 1 ? ' pontos!' : ' ponto!'}
          </p>
          <BtnPlayAgain history={ history } />
          <BtnRanking history={ history } />
        </div>
      );
    }
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
};

export default connect(mapStateToProps)(Feedback);
