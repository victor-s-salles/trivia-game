import { screen } from "@testing-library/react";
import Loading from "../components/Loading";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testando o componente Loading', () => {
  it('testa se Loading retorna o texto "Carregando..."', () => {
    renderWithRouterAndRedux(<Loading />);
    
    const carregando = screen.getByText('Carregando...');
    expect(carregando).toBeInTheDocument();
  })
})