import * as matchers from 'vitest-dom/matchers';
import { beforeAll, afterEach, afterAll, expect } from 'vitest';
import { server } from './mocks/server';

expect.extend(matchers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
