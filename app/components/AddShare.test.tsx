import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import AddShare from './AddShare';
import test from 'node:test';
import { expect } from 'vitest';
import AuthProvider, { AuthContext } from './AuthProvider';

// interface IProps {
//     handleCloseAddShare: () => void;
//     onSubmit: (arg: AddShareForm, userId: string) => void;
//     setAddShareForm: React.Dispatch<React.SetStateAction<AddShareForm>>;
//     addShareForm: AddShareForm | undefined;
//     tickerSearch: (arg: string) => Promise<TickerResponse | undefined>;
//   }

test('it shows two inputs and a button', () => {
  render(<AddShare />);

  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  expect(inputs).toHaveLength(2);
  //   expect(button).toBeDefined();
});
