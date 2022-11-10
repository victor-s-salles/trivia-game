const requestQuestions = async () => {
  const tokenOfPlayer = localStorage.getItem('token');
  const questions = `https://opentdb.com/api.php?amount=5&token=${tokenOfPlayer}`;
  // // const questionsTrybe = https://opentdb.com/api.php?amount=5&token
  // const questions = 'https://opentdb.com/api.php?amount=5&type=boolean';
  const response = await fetch(questions);
  const json = await response.json();
  return json;
};

export default requestQuestions;
