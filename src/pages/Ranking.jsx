import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BtnGoHome from '../components/BtnGoHome';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.recoverRanking();
  }

  recoverRanking() {
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    const ranking = rankingArray.sort((a, b) => b.score - a.score);
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div className="ranking-conteiner">

        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((player, index) => (
          <div key={ `${player.user}-${index}` } className="user-rank">
            <div>
              <img src={ player.image } alt="user-pic" />
              <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            </div>

            <div className="user-score">
              <img src="" alt="star-rank" />
              <p data-testid={ `player-score-${index}` }>{ player.score }</p>
            </div>
          </div>
        ))}
        <div className="ranking-content">

          <BtnGoHome history={ history } />

        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ player: { name, score, image } }) => ({
  name,
  score,
  image,
});

export default connect(mapStateToProps)(Ranking);
