import React from 'react';
import { describe, vi, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Register from './Register';

describe('Register component tests', () => {
  const handleOnRegister = vi.fn();

  it('Register component renders successfully', () => {
    render(<Register onRegister={handleOnRegister} />);
  });

  it('shows four inputs and a button ', () => {
    render(<Register onRegister={handleOnRegister} />);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button', {
      name: /create account/i,
    });
    expect(inputs).toHaveLength(4);
    expect(button).toBeInTheDocument();
  });

  it('can receive inputs and submit is called', async () => {
    const handleOnRegister = vi.fn();
    const user = userEvent.setup();
    render(<Register onRegister={handleOnRegister} />);

    const username = screen.getByPlaceholderText(/username/i);
    const firstName = screen.getByPlaceholderText(/first name/i);
    const lastName = screen.getByPlaceholderText(/last name/i);
    const password = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button', {
      name: /create account/i,
    });

    user.click(username);
    await user.type(username, 'jhm');

    user.click(firstName);
    await user.type(firstName, 'John');

    user.click(lastName);
    await user.type(lastName, 'Howard');

    user.click(password);
    await user.type(password, 'password');

    fireEvent.click(button);

    expect(username).toHaveValue('jhm');
    expect(firstName).toHaveValue('John');
    expect(lastName).toHaveValue('Howard');
    expect(password).toHaveValue('password');

    expect(handleOnRegister).toHaveBeenCalled();
    expect(handleOnRegister).toHaveBeenLastCalledWith({
      username: 'jhm',
      firstName: 'John',
      lastName: 'Howard',
      password: 'password',
    });
  });
});
