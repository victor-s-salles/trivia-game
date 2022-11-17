
import mockFetch from './helpers/mockData'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

  describe('Testando a pagina do game', ()=>{

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockFetch),
    }));
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Testa o funcionamento e pontuação das questoes a partir da tela de login', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputEmail, 'victor.s.salles@hotmail.com');

    const inputName = screen.getByTestId('input-player-name');
    userEvent.type(inputName, 'Victor');

    const btnPlay = screen.getByTestId('btn-play');
    userEvent.click(btnPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'));
    const score = await screen.findByTestId('header-score');


    const answerCorrect1 = await screen.findByTestId('correct-answer');
    userEvent.click(answerCorrect1);
    const btnNext = await screen.findByTestId('btn-next');
    expect(score.innerHTML).toBe('70');
    userEvent.click(btnNext);

    const answerCorrect2 = await screen.findByTestId('correct-answer');
    userEvent.click(answerCorrect2)
    expect(score.innerHTML).toBe('170');

    const btnGoHome = screen.getByTestId('btn-go-home')
    userEvent.click(btnGoHome)
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });




  })
