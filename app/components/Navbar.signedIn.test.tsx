import React from 'react';

import { render, screen } from '@testing-library/react';
import { describe, vi, it, expect } from 'vitest';
import Navbar from './Navbar';

describe('Navbar when user is signed in', () => {
  vi.mock('./UserContext', () => {
    return {
      useGlobalContext: () => {
        return {
          payloadData: {
            id: '12345',
            firstName: 'John',
            lastName: 'Howard',
            username: 'john',
          },
        };
      },
    };
  });

  it('when user is signed in, logout and welcome messages are visible', () => {
    render(<Navbar />);
    const logoutButton = screen.getByRole('link', { name: /log out/i });
    const welcomeMessage = screen.getByText('Hi John, welcome back');

    expect(logoutButton).toBeInTheDocument();
    expect(welcomeMessage).toBeInTheDocument();
  });
});
