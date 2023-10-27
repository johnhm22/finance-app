import React from 'react';
import { render } from '@testing-library/react';
import { expect, test } from 'vitest';

import Logout from './Logout';
import { describe } from 'node:test';
import { UserIdProvider } from './UserContext';

describe('testing logout', () => {
  render(
    <UserIdProvider>
      <Logout />
    </UserIdProvider>
  );

  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('it renders without crashing', () => {
    render(<Logout />);
  });
});
