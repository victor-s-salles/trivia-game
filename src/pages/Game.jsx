import PropTypes from 'prop-types';
import React from 'react';
import requestQuestions from '../utils/getQuestions';
import Header from '../components/Header';
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
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { actualQuestion } = this.state;
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
        if (allQuestions[actualQuestion].type === 'multiple') {
          this.randomizeQuestions();
        } else {
          this.trueOrFalseGenerator();
        }
      },
    );
  };

  shuffleArray = (arr) => {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  };

  trueOrFalseGenerator = () => {
    const { allQuestions, actualQuestion } = this.state;
    const trueBTN = (
      <button
        key="trueBTN"
        data-testid={ allQuestions[actualQuestion].correct_answer === 'True'
          ? 'correct-answer' : 'wrong-answer-0' }
        type="button"
      >
        True

      </button>
    );
    const falseBtn = (
      <button
        key="falseBTN"
        type="button"
        data-testid={ allQuestions[actualQuestion].correct_answer === 'False'
          ? 'correct-answer' : 'wrong-answer-0' }
      >
        False

      </button>
    );

    const Answers = [trueBTN, falseBtn];
    const shuffled = this.shuffleArray(Answers);
    this.setState({ allAnswers: shuffled });
  };

  randomizeQuestions = () => {
    const { allQuestions, actualQuestion } = this.state;
    const wrongAnswers = allQuestions[actualQuestion].incorrect_answers;
    const correctAnswer = allQuestions[actualQuestion].correct_answer;

    const correctAnswerBTN = (
      <button
        key="correct-answer"
        data-testid="correct-answer"
        type="button"
      >
        {correctAnswer}
      </button>
    );
    const wrongAnswersBTN = wrongAnswers.map((answer, index) => (
      <button
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        type="button"
      >
        {answer}

      </button>));

    const allAnswr = [correctAnswerBTN, ...wrongAnswersBTN];
    const shuffled = this.shuffleArray(allAnswr);
    // const shuffled = allAnswr.map((value) => ({ value, sort: Math.random() }))
    //   .sort((a, b) => a.sort - b.sort)
    //   .map(({ value }) => value);
    this.setState({
      allAnswers: shuffled,
      // correctAnswer,
    });
  };

  render() {
    const { isLoading, allQuestions, actualQuestion, allAnswers } = this.state;
    const { history } = this.props;
    if (isLoading) {
      return <div><h1>Carregando...</h1></div>;
    }
    if (allQuestions[actualQuestion].type === 'multiple') {
      return (
        <div>
          <Header history={ history } />
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
            {allAnswers.map((answer) => (
              answer
            ))}

          </div>

        </div>
      );
    }
    if (allQuestions[actualQuestion].type === 'boolean') {
      return (
        <div>
          <Header history={ history } />
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
            {allAnswers.map((answer) => (answer))}
          </div>
        </div>
      );
    }
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Game;