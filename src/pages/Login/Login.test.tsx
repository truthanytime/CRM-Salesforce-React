import userEvent from '@testing-library/user-event';

import { render, screen, act } from 'test/test-utils';
import Login from './Login';

test('renders login form', () => {
  render(<Login />);

  expect(screen.getByRole('heading', { name: /welcome back!/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /forgot my password/i })).toBeInTheDocument();

  const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(rememberMeCheckbox).not.toBeChecked();

  const logInButton = screen.getByRole('button', { name: /log in/i });
  expect(logInButton).toBeInTheDocument();
  expect(logInButton).toBeDisabled();

  const signInGoogleButton = screen.getByRole('button', { name: /sign in with google/i });
  expect(signInGoogleButton).toBeInTheDocument();
  expect(signInGoogleButton).toBeEnabled();
});

test('login disabled when entering invalid email', async () => {
  const invalidEmail = 'test@email';
  const validPassword = 'Test1234!';

  render(<Login />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/^password$/i);

  await act(async () => {
    userEvent.type(emailInput, invalidEmail);
    userEvent.type(passwordInput, validPassword);
  });

  expect(emailInput).toHaveValue(invalidEmail);
  expect(passwordInput).toHaveValue(validPassword);
  expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled();
});

test('login disabled when entering invalid password', async () => {
  const validEmail = 'test@email.com';
  const invalidPassword = 'Test123';

  render(<Login />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/^password$/i);

  await act(async () => {
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, invalidPassword);
  });

  expect(emailInput).toHaveValue(validEmail);
  expect(passwordInput).toHaveValue(invalidPassword);
  expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled();
});

test('login enabled when entering a valid email and password', async () => {
  const validEmail = 'test@email.com';
  const validPassword = 'Test1234!';

  render(<Login />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/^password$/i);

  await act(async () => {
    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, validPassword);
  });

  expect(emailInput).toHaveValue(validEmail);
  expect(passwordInput).toHaveValue(validPassword);
  expect(screen.getByRole('button', { name: /log in/i })).toBeEnabled();
});
