import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, vi, it, expect } from 'vitest';
import Navbar from './Navbar';

describe('Navbar tests when user is signed out', () => {
  vi.mock('./UserContext', () => {
    return {
      useGlobalContext: () => {
        return {
          payloadData: {
            exp: 0,
            firstName: '',
            iat: 0,
            id: '',
            lastName: '',
            role: '',
            username: '',
          },
        };
      },
    };
  });

  it('when user is not signed in, login and Create Account are visible', () => {
    render(<Navbar />);
    const loginButton = screen.getByRole('link', { name: /log in/i });
    const createAccountButton = screen.getByRole('link', {
      name: /create account/i,
    });

    expect(loginButton).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
  });
});
