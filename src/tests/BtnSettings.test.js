import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testa botão de settings.', () => {
  it('testa se o botão de opções leva para página de opções.', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    
    const btn = screen.getByRole('button', { name: /Settings/i });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);

    const {pathname} = history.location;
    expect(pathname).toBe('/settings');
  })
})