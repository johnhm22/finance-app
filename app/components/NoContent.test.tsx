import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import NoContent from './NoContent';

test('it renders without crashing', () => {
  render(<NoContent />);
});
