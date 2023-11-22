import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import NotFound from './not-found';

test('it renders without crashing', () => {
  <NotFound />;
});

test('it contains exepected text and link to home page', async () => {
  render(<NotFound />);
  const heading = screen.getAllByRole('heading');
  const link = await screen.findByRole('link');
  expect(heading).toHaveLength(2);
  expect(heading[1]).toHaveTextContent("Sorry, we couldn't find that page");
  expect(link).toHaveTextContent(/home page/i);
  expect(link).toHaveAttribute('href', '/');
});
