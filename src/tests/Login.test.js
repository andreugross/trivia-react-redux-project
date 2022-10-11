import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';


describe('Verifica página inicial de logim', () => {
  it('Verifica se possui o texto Login', () => {
    renderWithRouterAndRedux(<App />);
    const textLogin = screen.getByRole('heading', {
      name: /login/i,
    });
   const btnSettings = screen.getByRole('button', {  name: /settings/i});
    
    expect(btnSettings).toBeInTheDocument();
    expect(textLogin).toBeInTheDocument();
  });

  it('verifica se o botão play vai para a pagina /game', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'pessoa@gmail.com');
    userEvent.click(buttonPlay);

    expect(history.location.pathname).toBe('/game');
  });
  it('verifica se o botão settings vai para a pagina /settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSettings = screen.getByRole('button', {  name: /settings/i});
    
    userEvent.click(btnSettings);

    expect(history.location.pathname).toBe('/settings');
  });

  it('Verifica se é possível escrever nos inputs de email e password', () => {
    renderWithRouterAndRedux(<Login />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
  });
});
