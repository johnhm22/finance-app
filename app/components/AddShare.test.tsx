import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import { expect, vi, test, describe } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import AddShare from './AddShare';

describe('AddShare tests', () => {
  const handleCloseAddShare = vi.fn();
  const onSubmit = vi.fn();
  const setAddShareForm = vi.fn();

  const ticker = {
    country: '',
    has_eod: false,
    has_intraday: false,
    name: '',
    symbol: '',
    stock_exchange: {
      acronym: '',
      city: '',
      country: '',
      country_code: '',
      mic: '',
      name: '',
      website: '',
    },
  };

  const addShareForm = {
    bookCost: 0,
    quantity: 0,
    ticker: ticker,
  };

  const tickerSearch = vi.fn();

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

  const renderComponent = () => {
    return render(
      <AddShare
        handleCloseAddShare={handleCloseAddShare}
        onSubmit={onSubmit}
        setAddShareForm={setAddShareForm}
        addShareForm={addShareForm}
      />
    );
  };

  test('it renders without crashing', () => {
    renderComponent();
  });

  test('Component heading is visible', () => {
    renderComponent();
    const heading = screen.getByRole('heading', {
      name: 'Add new shareholding',
    });
    expect(heading).toBeInTheDocument();
  });

  test('it displays input for new share', async () => {
    const user = userEvent.setup();
    renderComponent();
    const shareInput = screen.getByPlaceholderText(
      /Enter name or share symbol/i
    );
    user.click(shareInput);

    await user.type(shareInput, 'Barclays');
    expect(shareInput).toHaveValue('Barclays');
  });

  test('it calls api and displays list of companies when search text entered and on select of company, symbol is stored in input field', async () => {
    const user = userEvent.setup();
    renderComponent();
    const shareInput = screen.getByPlaceholderText(
      /enter name or share symbol/i
    );

    user.click(shareInput);

    await user.type(shareInput, 'Barclays');
    expect(shareInput).toHaveValue('Barclays');

    const list = await screen.findByRole('list');

    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(1);
    user.click(items[0]);
    await waitFor(() => {
      expect(shareInput).toHaveValue('BARC.XLON');
    });
  });

  test('it accepts entries for cost and quantity', async () => {
    const user = userEvent.setup();
    renderComponent();

    const cost = screen.getByPlaceholderText(/book cost/i);
    const quantity = screen.getByPlaceholderText(/quantity/i);

    user.click(cost);
    await user.type(cost, '555');
    expect(cost).toHaveValue('555');

    user.click(quantity);
    await user.type(quantity, '1000');
    expect(quantity).toHaveValue('1000');
  });
});
