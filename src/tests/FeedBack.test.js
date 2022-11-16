import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";


describe ('Testes da tela de Feedback', ()=> {
    test('se aparece a mensagem WellDone! caso o score for maior que 3',()=>{
        const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 4, assertions: 80, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')
        const {pathname} = history.location
        expect(pathname).toBe('/feedback')
        const message = screen.getByRole('heading', {level: 2, name: 'Well Done!'})
        expect(message).toBeInTheDocument()
    })
    test('se aparece a mensagem Could be better...! caso o score for menor que 3',()=>{
        const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 2, assertions: 2, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')
        const {pathname} = history.location
        expect(pathname).toBe('/feedback')
        const message = screen.getByRole('heading', {level: 2, name: 'Could be better...'})
        expect(message).toBeInTheDocument()
    })
    test('se as informações sobre o player são exibidas corretamente',()=>{
        renderWithRouterAndRedux(<App/>, {player: {score: 25, assertions: 30, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')
        const name = screen.getByRole('heading', {level: 3, name: 'Victor'})
        expect(name).toBeInTheDocument()

        const score = screen.getByRole('heading', {level: 4, name: '25'})
        expect(score).toBeInTheDocument()

        const assertions = screen.getByText('30')
        expect(assertions).toBeInTheDocument()
    })
    test('o funcionamento do botão Play Again',()=>{
        const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 25, assertions: 30, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')
        const btn = screen.getByRole('button', {name: 'Play Again'})
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)
        const {pathname} = history.location
        expect(pathname).toBe('/')
    })
    test('o funcionamento do botão Ranking',()=>{
        const {history} = renderWithRouterAndRedux(<App/>, {player: {score: 25, assertions: 30, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')
        const btn = screen.getByRole('button', {name: 'Ranking'})
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)
        const {pathname} = history.location
        expect(pathname).toBe('/ranking')
    })
    test('se o plural é exbido corretamene',()=>{
        renderWithRouterAndRedux(<App/>, {player: {score: 25, assertions: 30, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')

        const assertions = screen.getByText('questões!')
        expect(assertions).toBeInTheDocument()
        const score = screen.getByText('pontos!')
        expect(score).toBeInTheDocument()
    })
    test('se o singular é exbido corretamene',()=>{
        renderWithRouterAndRedux(<App/>, {player: {score: 1, assertions: 1, gravatarEmail: 'victor.s.salles@hotmail.com', name: 'Victor'}}, '/feedback')

        const assertions = screen.getByText('questão!')
        expect(assertions).toBeInTheDocument()
        const score = screen.getByText('ponto!')
        expect(score).toBeInTheDocument()
    })
})