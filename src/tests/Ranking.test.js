import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const player = {
  name: 'Lucas',
  assertions: 3,
  score: 28,
  gravatarEmail: 'lucas@lucas.com',
  token: 'a4ddb6ded7a91c8f82fa435175faa21ca3b41760ee979a3eddea04a1479ea262',
  isFetching: false,
  error: false,
  hash: 'd41d8cd98f00b204e9800998ecf8427e',
  response: 0,
  questions: [
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'hard',
      question: 'In the game &quot;The Sims&quot;,'
       + 'how many Simoleons does each family start with?',
      correct_answer: '20,000',
      incorrect_answers: [
        '10,000',
        '15,000',
        '25,000',
      ],
    },
    {
      category: 'Vehicles',
      type: 'multiple',
      difficulty: 'hard',
      question: 'The difference between the lengths of a Boeing 777-300ER'
      + 'and an Airbus A350-1000 is closest to:',
      correct_answer: '0.1m',
      incorrect_answers: [
        '1m',
        '10m ',
        '100m',
      ],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'easy',
      question: 'Which of these is NOT a team available in the game Pok&eacute;mon Go?',
      correct_answer: 'Team Rocket',
      incorrect_answers: [
        'Team Instinct',
        'Team Valor',
        'Team Mystic',
      ],
    },
    {
      category: 'Entertainment: Board Games',
      type: 'boolean',
      difficulty: 'easy',
      question: 'The card game &quot;Munchkin&quot; won the 2001 Origins Award for'
      + 'Best Traditional Card Game.',
      correct_answer: 'True',
      incorrect_answers: [
        'False',
      ],
    },
    {
      category: 'Geography',
      type: 'multiple',
      difficulty: 'hard',
      question: 'Which of these cities has a 4&deg; East longitude. ',
      correct_answer: 'Amsterdam',
      incorrect_answers: [
        'Rio de Janero',
        'Toronto',
        'Hong Kong',
      ],
    },
  ],
  ranking: [
    {
      name: 'Lucas',
      hash: 'd41d8cd98f00b204e9800998ecf8427e',
      score: 28
    },
  ]
};

describe('Realiza testes na página Ranking', () => {
  it('Verifica se existe a imagem do jogador', () => {
    const { history } = renderWithRouterAndRedux(<App />, { player }, '/feedback');
    expect(history.location.pathname).toBe('/feedback')

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i
    });

    expect(btnRanking).toBeInTheDocument()
    userEvent.click(btnRanking)

    const userImage = screen.getByRole('img', {
      name: /user-pic/i
    });
    expect(userImage).toBeInTheDocument()
  });

  it('Verifica se existe o nome do jogador', () => {
    const { history } = renderWithRouterAndRedux(<App />, { player }, '/feedback');
    expect(history.location.pathname).toBe('/feedback')

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i
    });

    expect(btnRanking).toBeInTheDocument()
    userEvent.click(btnRanking)

    const userName = screen.getAllByText('Lucas');
    expect(userName[0]).toBeInTheDocument()
  
  });

  it('Verifica se existe um campo com o score do jogador', () => {
    const { history } = renderWithRouterAndRedux(<App />, { player }, '/feedback');
    expect(history.location.pathname).toBe('/feedback')

    const btnRanking = screen.getByRole('button', {
      name: /ranking/i
    });

    expect(btnRanking).toBeInTheDocument()
    userEvent.click(btnRanking)

    const userScore = screen.getByTestId('player-score-0');
    expect(userScore).toBeInTheDocument()
  
  
  });

  // it('Verifica se existe a menssagem de feedback', () => {
  //   fail('Teste vazio!');
  // });

  // it('Verifica se existe a menssagem com o número de questões corretas', () => {
  //   fail('Teste vazio!');
  // });

  // it('Verifica se existe a menssagem com o total de pontos do jogador', () => {
  //   fail('Teste vazio!');
  // });

  // it('Verifica se existe o botão \'Play Again\'', () => {
  //   fail('Teste vazio!');
  // });

  // it('Verifica se existe o botão \'Ver e Salvar Ranking\'', () => {
  //   fail('Teste vazio!');
  // });
});
