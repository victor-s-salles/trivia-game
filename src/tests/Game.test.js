import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

import App from '../App'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

const playerStore = {
    score: 300,
    assertions: 5,
    gravatarEmail: 'victor.s.salles@hotmail.com',
    name: 'Victor',
  };

  describe('Teste da pagina Game', ()=>{
    afterEach(()=>jest.resetAllMocks())

    test('se a pagina retorna para o login, caso o token seja invalido', async ()=>{
        const token = '12345678'
        jest.spyOn(global,'fetch')

        act(()=>{ 
          global.fetch.mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(token),
        }) })

    
        const {history} = renderWithRouterAndRedux(<App/>)
        const name = screen.getByLabelText(/Nome/i)
        const email = screen.getByLabelText(/Email/i)
        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
        userEvent.type(name, 'Victor')
        userEvent.type(email, 'victor.s.salles@hotmail.com')

        const btn = screen.getByRole('button', {name: 'Play'})
        expect(btn).toBeInTheDocument()

        userEvent.click(btn)
        const {pathname} = history.location


        await waitFor(() => {
        
            expect(pathname).toBe('/')
          })
    })

  })
