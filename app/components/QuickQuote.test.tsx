import React from 'react';
import { render } from '@testing-library/react';
import { test } from 'vitest';

import QuickQuote from './QuickQuote';

test('it renders without crashing', () => {
  render(<QuickQuote />);
});
