import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import '@testing-library/jest-dom';

import Page from './page';

describe('', () => {
  test('it renders without crashing', () => {
    render(<Page />);
  });

  test('it has the correct heading', () => {
    render(<Page />);
    const heading = screen.getByText(/Investments/i);
  });

  test('it has all the column headers', () => {
    render(<Page />);
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(9);

    const colHeadings = [
      'Total Value',
      'Total Cost',
      'Profit/Loss',
      'Symbol/Name',
      'Quantity',
      'Book Cost',
      'Price*',
      'Value',
      'Edit/delete',
    ];

    for (let element of colHeadings) {
      expect(
        screen.getByRole('columnheader', { name: element })
      ).toBeInTheDocument();
    }
  });

  test('clicking Add New Share button opens modal to add new share', async () => {
    render(<Page />);
    const addNewShareButton = screen.getByRole('button', {
      name: 'Add New Share',
    });
    expect(addNewShareButton).toBeInTheDocument();

    fireEvent.click(addNewShareButton);

    const heading = await screen.findByRole('heading', {
      name: 'Add new shareholding',
    });
    expect(heading).toBeInTheDocument();
  });

  test('on loading it displays portfolio details', async () => {
    render(<Page />);
    const columnHeaders = screen.getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(9);
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(3);

    screen.logTestingPlaygroundURL();

    screen.getByRole('row', {
      name: /lloy\.xlon lloyds banking group plc ord 10p 60 20p 45\.00p £ 27\.00 edit delete/i,
    });

    screen.getByRole('row', {
      name: /rya\.xlon ryanair holdings plc ord eur0\.006 10 90p 125\.50p £ 12\.55 edit delete/i,
    });

    const testValuesObject = {
      quantity: '60',
      cost: '20p',
      price: '45.00p',
      value: '£ 27.00',
      quantity2: '10',
      cost2: '90p',
      price2: '125.50p',
      value2: '£ 12.55',
    };

    for (let element in testValuesObject) {
      expect(
        screen.getByRole('cell', {
          name: testValuesObject[element as keyof typeof testValuesObject],
        })
      ).toBeInTheDocument();
    }

    const totalsObject = {
      totalValue: '£ 39.55',
      totalCost: '£ 21.00',
      profitLoss: '£ 18.55',
    };

    for (let element in totalsObject) {
      expect(
        screen.getByRole('cell', {
          name: totalsObject[element as keyof typeof totalsObject],
        })
      ).toBeInTheDocument();
    }
    // screen.logTestingPlaygroundURL();
  });
});
