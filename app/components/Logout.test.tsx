import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test, vi, describe } from 'vitest';

import Logout from './Logout';

describe('testing logout', () => {
  vi.mock('../utils/deleteCookies', () => {
    return { deleteCookies: () => {} };
  });

  vi.mock('./UserContext', () => {
    return {
      useGlobalContext: () => {
        return { setPayloadData: () => {} };
      },
    };
  });

  test('it renders without crashing', () => {
    render(<Logout />);
  });

  test('it contains exepected text and link to welcome page', async () => {
    render(<Logout />);
    const link = await screen.findByRole('link');
    screen.debug();
    screen.getByText(/thanks for visiting, goodbye!/i);
    expect(link).toHaveTextContent(/back to welcome page/i);
    expect(link).toHaveAttribute('href', '/');
  });
});
