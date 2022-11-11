import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    this.createRanking();
  }

  createRanking() {
    const { name, score, image } = this.props;
    const picture = image;
    const playerRank = [
      name,
      score,
      picture,
    ];
    console.log(playerRank);
    localStorage.setItem('ranking', playerRank);
  }

  render() {
    const { index } = this.state;
    const { name, score, image } = this.props;
    return (
      <div className="ranking-conteiner">

        <h1>Ranking</h1>

        <div className="ranking-content">

          <div className="user-rank">
            <div>
              <img src={ image } alt="user-pic" />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
            </div>

            <div className="user-score">
              <img src="" alt="star-rank" />
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ playerReducer: { name, score, image } }) => ({
  name,
  score,
  image,
});

export default connect(mapStateToProps)(Ranking);
