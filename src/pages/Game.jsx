import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import requestQuestions from '../utils/getQuestions';
import Header from '../components/Header';
import { timerOutFalse } from '../redux/actions';
import Timer from '../Components/Timer';
// import Loading from '../Components/Loading';

class Game extends React.Component {
  state = {
    allQuestions: [],
    actualQuestion: 0,
    isLoading: true,
    allAnswers: [],
    // correctAnswer: '',
    // correctAnswerIndex: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.fetchQuestions();
    dispatch(timerOutFalse());
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    this.setState({ isLoading: true });
    const response = await requestQuestions();
    const errorCode = 0;
    if (response.response_code !== errorCode) {
      history.push('/');
    }
    const allQuestions = response.results.map((value) => value);
    this.setState(
      () => ({ allQuestions }),
      () => {
        this.setState({ isLoading: false });
        this.randomizeQuestions();
      },
    );
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  randomizeQuestions = () => {
    const { allQuestions, actualQuestion } = this.state;
    let wrongAnswers = allQuestions[actualQuestion].incorrect_answers;
    const correctAnswer = allQuestions[actualQuestion].correct_answer;

    if (allQuestions[actualQuestion].type === 'boolean') {
      wrongAnswers = [wrongAnswers];
    }
    const correctAnswerOBJ = {
      question: correctAnswer,
      correct: true,
    };
    const wrongAnswersOBJ = wrongAnswers.map((question) => ({
      question,
      correct: false,
    }));

    const allAnswr = [correctAnswerOBJ, ...wrongAnswersOBJ];
    const shuffled = this.shuffleArray(allAnswr);
    this.setState({
      allAnswers: shuffled,
      // correctAnswer,
    });
  };

  render() {
    const { isLoading, allQuestions, actualQuestion, allAnswers } = this.state;
    const { history, timerOut } = this.props;
    if (isLoading) {
      return <div><h1>Carregando...</h1></div>;
    }
    return (
      <div>
        <Header history={ history } />
        <Timer time={ 30 } />
        <h2 data-testid="question-category">
          {`Categoria: ${allQuestions[actualQuestion].category}`}
        </h2>
        <h2 data-testid="question-text">
          {`Pergunta: 
          ${allQuestions[actualQuestion].question}`}

        </h2>
        <div
          data-testid="answer-options"
        >
          {allAnswers.map((answerOBJ, index) => (
            <button
              key={ answerOBJ.question }
              data-testid={ answerOBJ.correct ? 'correct-answer'
                : `wrong-answer-${index}` }
              type="button"
              disabled={ timerOut }
            >
              {answerOBJ.question}

            </button>
          )) }

        </div>

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  timerOut: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (globalState) => ({
  timerOut: globalState.gameReducer.timerOut,

});
export default connect(mapStateToProps)(Game);
