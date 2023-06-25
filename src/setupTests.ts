// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from 'test/server';

window.matchMedia =
  window.matchMedia ||
  (() => {
    return { matches: false, addListener: jest.fn(), removeListener: jest.fn() };
  });

window.scrollTo = jest.fn();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  jest.clearAllMocks();
});

beforeEach(() => jest.restoreAllMocks());

jest.mock('jwt-decode', () => () => ({
  'cognito:groups': ['admin'],
  sub: 'f551f3c8-9fb8-4227-a919-1d72e98a885a',
}));
