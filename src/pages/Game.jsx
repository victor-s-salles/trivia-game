import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import requestQuestions from '../utils/getQuestions';
import Header from '../components/Header';
import { scoreSum, timerOutFalse, timerOutTrue } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends React.Component {
  state = {
    allQuestions: [],
    actualQuestion: 0,
    isLoading: true,
    allAnswers: [],
    timeResponse: 30,
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

  checkAnswer = (answer) => {
    const { dispatch } = this.props;
    dispatch(timerOutTrue());
    if (answer === true) {
      const { allQuestions, actualQuestion } = this.state;
      const { difficulty } = allQuestions[actualQuestion];
      const { time } = this.props;
      const baseScore = 10;
      const hard = 3;
      const medium = 2;
      const easy = 1;

      switch (difficulty) {
      case 'hard':
        dispatch(scoreSum(baseScore + hard * time));

        break;
      case 'medium':
        dispatch(scoreSum(baseScore + medium * time));

        break;
      case 'easy':
        dispatch(scoreSum(baseScore + easy * time));

        break;

      default:
        break;
      }
    }
    console.log(answer);
  };

  nextQuestion = () => {
    const { actualQuestion } = this.state;
    // const { dispatch } = this.props;
    const maxNumberQuestions = 4;
    if (actualQuestion < maxNumberQuestions) {
      this.setState((prev) => ({ actualQuestion: prev.actualQuestion + 1 }));
      this.randomizeQuestions();
      this.setState({ timeResponse: 5 }); // Pq não passar 30 segundos para o 'time' do global?
      // dispatch(timerOutFalse());
    }
  };

  render() {
    const {
      isLoading, allQuestions, actualQuestion, allAnswers, timeResponse } = this.state;
    const { history, timerOut } = this.props;
    if (isLoading) {
      return (
        <div>
          <h1>Carregando...</h1>
        </div>
      );
    }
    return (
      <div>
        <Header history={ history } />
        <Timer time={ timeResponse } />
        <h2 data-testid="question-category">
          {`Categoria: ${allQuestions[actualQuestion].category}`}

        </h2>
        <h2 data-testid="question-text">
          {`Pergunta: 
          ${allQuestions[actualQuestion].question}`}
        </h2>
        <div data-testid="answer-options">
          {allAnswers.map((answerOBJ, index) => (
            <button
              key={ answerOBJ.question }
              data-testid={
                answerOBJ.correct ? 'correct-answer' : `wrong-answer-${index}`
              }
              type="button"
              disabled={ timerOut }
              onClick={ () => {
                this.checkAnswer(answerOBJ.correct);
              } }
            >
              {answerOBJ.question}
            </button>
          ))}
        </div>
        {timerOut && (
          <button data-testid="btn-next" type="button" onClick={ this.nextQuestion }>
            Next
          </button>
        )}
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
  time: PropTypes.number.isRequired,
};
const mapStateToProps = (globalState) => ({
  timerOut: globalState.gameReducer.timerOut,
  time: globalState.gameReducer.time,
});
export default connect(mapStateToProps)(Game);
