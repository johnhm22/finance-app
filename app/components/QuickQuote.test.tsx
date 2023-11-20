import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import QuickQuote from './QuickQuote';
import { describe } from 'node:test';

//reminder of helper functions:
// screen.debug();
// screen.logTestingPlaygroundURL();

describe('QuickQuote test', () => {
  test('it renders without crashing', () => {
    render(<QuickQuote />);
  });

  test('it displays input for share search', () => {
    render(<QuickQuote />);
    const shareInput = screen.getByPlaceholderText(/enter name or symbol/i);
  });

  test.only('it displays price of selected share', async () => {
    const user = userEvent.setup();

    render(<QuickQuote />);

    const shareInput = screen.getByPlaceholderText(/enter name or symbol/i);
    user.click(shareInput);

    await user.type(shareInput, 'Barclays');
    expect(shareInput).toHaveValue('Barclays');

    const list = await screen.findByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(1);
    user.click(items[0]);
    await screen.findByText(200);
  });
});
