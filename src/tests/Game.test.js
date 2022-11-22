
import mockFetch from './helpers/mockData'
import mockFetchHack from './helpers/mockDataHack';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Game from '../pages/Game';
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

  it('Testa a dificuldade default', async () => {
    const INITIAL_STATE = {
      timerOut: false,
      time: 30,
    };

    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json: () => Promise.resolve(mockFetchHack), ok: true}))
    const { store } = renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/game');
    
    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(1000);
    const btnCorrect = screen.getByTestId(/correct-answer/);
    userEvent.click(btnCorrect);

    const globalState = store.getState();
    const { player: { score } } = globalState;
    expect(score).toBe(0);

  });

  test('se no tipo boolean só tem uma alternativa incorreta', async () => {
    const INITIAL_STATE = {
      timerOut: false,
      time: 30,
    };

    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json: () => Promise.resolve(mockFetchHack), ok: true}))
    const { store } = renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/game');

    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(1000);

    const btnFalse = screen.getByRole('button', { name: 'False' });
    expect(btnFalse).toBeInTheDocument();
  })

})
