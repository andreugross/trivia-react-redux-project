import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

beforeEach(() => {
  renderWithRouterAndRedux(<Login />);
});

describe('Verifica página inicial de logim', () => {
  it('Verifica se possui o texto Login', () => {
    const textLogin = screen.getByRole('heading', {
      name: /login/i,
    });
    const btnSettings = screen.getByRole('button', {  name: /settings/i});
    
    expect(btnSettings).toBeInTheDocument();
    expect(textLogin).toBeInTheDocument();
  });

  it('Verifica se é possível escrever nos inputs de email e password', () => {
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.click(buttonPlay);
  });
});
