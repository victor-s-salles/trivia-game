import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Timer from "../components/Timer";
import mockFetch from "./helpers/mockData";
import Game from "../pages/Game";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

jest.setTimeout(35000);

describe('Testa o componente Timer', () => {
  it('Testa se a função tick é chamada', async () => {
    const INITIAL_STATE = {
      timerOut: false,
      time: 30,
    };
    
    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json: () => Promise.resolve(mockFetch), ok: true}))
    const { store, history } = renderWithRouterAndRedux(<Game />, INITIAL_STATE, '/game');
    
    const globalState = store.getState();
    const { gameReducer: { time } } = globalState;
    expect(time).toBe(30);

    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(32000);

    expect(store.getState().gameReducer.time).toBe(0);

    const btn = screen.getByRole('button', { name: 'Next' });
    userEvent.click(btn);

    expect(store.getState().gameReducer.time).toBe(30);

    const btnWrong = screen.getAllByTestId(/wrong-answer-/);
    await timeout(1000);

    userEvent.click(btnWrong[0]);

    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    

    await timeout(1000);
    const btnCorrect = screen.getByTestId('correct-answer');
    userEvent.click(btnCorrect);

    // await timeout(1000);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    
    const btnErrado = screen.getAllByTestId(/wrong-answer-/);
    // await timeout(1000);

    userEvent.click(btnErrado[0]);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));
    

    const btnDasErradas = screen.getAllByTestId(/wrong-answer-/);
    userEvent.click(btnDasErradas[0]);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    // await timeout(1000);
    // userEvent.click(screen.getByRole('button', { name: 'Next' }));
    console.log(history.location.pathname);

  });

  it('teste novo', async () => {
    global.fetch = jest.fn().mockResolvedValue(Promise.resolve({ json: () => Promise.resolve({response_code: 3,}), ok: true}));

    const { history } = renderWithRouterAndRedux(<Game />, '/game');

    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
    } await timeout(3000);

    expect(history.location.pathname).toBe('/');
  })

  it('Outra parada', () => {

  })
});