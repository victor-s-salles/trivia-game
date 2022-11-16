import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import BtnPlayAgain from '../components/BtnPlayAgain';
import BtnRanking from '../components/BtnRanking';
import FeedbackHeader from '../components/FeedbackHeader';

class Feedback extends React.Component {
  componentDidMount() {
    this.createRanking();
  }

  createRanking() {
    const { name, score, image, assertions } = this.props;
    const playerRank = {
      name,
      score,
      image,
      assertions,
    };
    const actualPlayers = localStorage.getItem('ranking');
    if (actualPlayers) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(playerRank);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const player = [playerRank];
      localStorage.setItem('ranking', JSON.stringify(player));
    }
  }

  render() {
    const { assertions, score, history } = this.props;
    const THREE = 3;
    if (assertions < THREE) {
      return (
        <div>
          <FeedbackHeader />
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
          <FeedbackHeader />
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  image: state.player.image,
});

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
};

export default connect(mapStateToProps)(Feedback);
