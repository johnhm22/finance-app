import React from 'react';
import { describe, vi, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Login from './Login';

describe('Login component tests', () => {
  const handleOnLogin = vi.fn();

  it('Login component renders successfully', () => {
    render(<Login onLogin={handleOnLogin} />);
  });

  it('shows two inputs and a button ', () => {
    render(<Login onLogin={handleOnLogin} />);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button', {
      name: /log in/i,
    });
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });

  it('can receive inputs and submit is called', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={handleOnLogin} />);

    const username = screen.getByPlaceholderText(/username/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', {
      name: /log in/i,
    });

    user.click(username);
    await user.type(username, 'jhm');

    user.click(password);
    await user.type(password, 'password');

    fireEvent.click(button);

    expect(username).toHaveValue('jhm');
    expect(password).toHaveValue('password');

    expect(handleOnLogin).toHaveBeenCalled();
    expect(handleOnLogin).toHaveBeenLastCalledWith({
      username: 'jhm',
      password: 'password',
    });
  });
});
