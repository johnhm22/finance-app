import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

import ActiveInvestor from './ActiveInvestor';

test('heading is activeInvestor', () => {
  render(<ActiveInvestor />);
  const heading = screen.getByRole('heading', {
    name: /activeinvestor/i,
  });

  expect(heading).toBeInTheDocument();
});
