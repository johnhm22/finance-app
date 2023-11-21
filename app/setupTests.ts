import * as matchers from 'vitest-dom/matchers';
import { beforeAll, afterEach, afterAll, expect } from 'vitest';
import { server } from './mocks/server';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
