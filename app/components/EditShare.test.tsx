import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, vi, test, describe } from 'vitest';
import { userEvent } from '@testing-library/user-event';

import EditShare from './EditShare';

const handleCloseEdit = vi.fn();
const onSubmit = vi.fn();
const shareDataToEdit = {
  id: '12345',
  symbol: 'RIO.XLON',
  bookCost: 5500,
  quantity: 1000,
};
const setShareDataToEdit = vi.fn();

const renderEditShare = () => {
  return render(
    <EditShare
      handleCloseEdit={handleCloseEdit}
      onSubmit={onSubmit}
      shareDataToEdit={shareDataToEdit}
      setShareDataToEdit={setShareDataToEdit}
    />
  );
};

describe('EditShare tests', () => {
  test('it renders without crashing', () => {
    renderEditShare();
  });

  test('component heading is visible', () => {
    renderEditShare();
    const heading = screen.getByRole('heading', {
      name: 'Update data for shareholding',
    });
    expect(heading).toBeInTheDocument();
  });

  test('it displays current share details to be edited', async () => {
    const user = userEvent.setup();
    renderEditShare();

    const bookCost = screen.getByPlaceholderText(/book cost/i);
    const quantity = screen.getByPlaceholderText(/quantity/i);
    const button = screen.getByRole('button', {
      name: /Update/i,
    });

    screen.getByText(/symbol: rio\.xlon/i);
    expect(bookCost).toHaveValue('5500');
    expect(quantity).toHaveValue('1000');
  });

  test('edited details are submitted when Update button clicked', async () => {
    const user = userEvent.setup();
    renderEditShare();

    const bookCost = screen.getByPlaceholderText(/book cost/i);
    const quantity = screen.getByPlaceholderText(/quantity/i);
    const button = screen.getByRole('button', {
      name: /Update/i,
    });

    screen.getByText(/symbol: rio\.xlon/i);
    expect(bookCost).toHaveValue('5500');
    expect(quantity).toHaveValue('1000');

    fireEvent.click(button);

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenLastCalledWith({
      id: '12345',
      symbol: 'RIO.XLON',
      bookCost: 5500,
      quantity: 1000,
    });
  });
});
