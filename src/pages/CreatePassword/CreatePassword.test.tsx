import userEvent from '@testing-library/user-event';

import { render, screen, waitFor } from 'test/test-utils';
import CreatePassword from './CreatePassword';

test('renders create password form', () => {
  render(<CreatePassword />);

  expect(screen.getByRole('heading', { name: /create new password!/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/^new password$/i)).toBeInTheDocument();

  const charLengthCheckbox = screen.getByLabelText(/at least 8 characters long/i);
  expect(charLengthCheckbox).toBeInTheDocument();
  expect(charLengthCheckbox).not.toBeChecked();

  const lowercaseCheckbox = screen.getByLabelText(/one lowercase character/i);
  expect(lowercaseCheckbox).toBeInTheDocument();
  expect(lowercaseCheckbox).not.toBeChecked();

  const uppercaseCheckbox = screen.getByLabelText(/one uppercase character/i);
  expect(uppercaseCheckbox).toBeInTheDocument();
  expect(uppercaseCheckbox).not.toBeChecked();

  const specialCharCheckbox = screen.getByLabelText(/one number, symbol, or whitespace character/i);
  expect(specialCharCheckbox).toBeInTheDocument();
  expect(specialCharCheckbox).not.toBeChecked();

  const savePasswordButton = screen.getByRole('button', { name: /save new password/i });
  expect(savePasswordButton).toBeInTheDocument();
  expect(savePasswordButton).toBeDisabled();
});

test('password is invalid but at least 8 characters long and one number', async () => {
  const invalidPassword = '12345678';

  render(<CreatePassword />);

  const passwordInput = screen.getByLabelText(/^new password$/i);

  userEvent.type(passwordInput, invalidPassword);

  await waitFor(() => {
    expect(screen.getByLabelText(/at least 8 characters long/i)).toBeChecked();
    expect(screen.getByLabelText(/one lowercase character/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one uppercase character/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one number, symbol, or whitespace character/i)).toBeChecked();
    expect(screen.getByRole('button', { name: /save new password/i })).toBeDisabled();
  });
});

test('password is invalid but includes one lowercase character', async () => {
  const invalidPassword = 'p';

  render(<CreatePassword />);

  const passwordInput = screen.getByLabelText(/^new password$/i);

  userEvent.type(passwordInput, invalidPassword);

  await waitFor(() => {
    expect(screen.getByLabelText(/at least 8 characters long/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one lowercase character/i)).toBeChecked();
    expect(screen.getByLabelText(/one uppercase character/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one number, symbol, or whitespace character/i)).not.toBeChecked();
    expect(screen.getByRole('button', { name: /save new password/i })).toBeDisabled();
  });
});

test('password is invalid but includes one uppercase character', async () => {
  const invalidPassword = 'P';

  render(<CreatePassword />);

  const passwordInput = screen.getByLabelText(/^new password$/i);

  userEvent.type(passwordInput, invalidPassword);

  await waitFor(() => {
    expect(screen.getByLabelText(/at least 8 characters long/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one lowercase character/i)).not.toBeChecked();
    expect(screen.getByLabelText(/one uppercase character/i)).toBeChecked();
    expect(screen.getByLabelText(/one number, symbol, or whitespace character/i)).not.toBeChecked();
    expect(screen.getByRole('button', { name: /save new password/i })).toBeDisabled();
  });
});

test('password in valid and save new password button is enabled', async () => {
  const validPassword = 'Test1234';

  render(<CreatePassword />);

  const passwordInput = screen.getByLabelText(/^new password$/i);

  userEvent.type(passwordInput, validPassword);

  await waitFor(() => {
    expect(screen.getByLabelText(/at least 8 characters long/i)).toBeChecked();
    expect(screen.getByLabelText(/one lowercase character/i)).toBeChecked();
    expect(screen.getByLabelText(/one uppercase character/i)).toBeChecked();
    expect(screen.getByLabelText(/one number, symbol, or whitespace character/i)).toBeChecked();
    expect(screen.getByRole('button', { name: /save new password/i })).toBeEnabled();
  });
});
