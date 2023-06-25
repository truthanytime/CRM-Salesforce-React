import userEvent from '@testing-library/user-event';

import { render, screen, act } from 'test/test-utils';
import ResetPassword from './ResetPassword';

test('renders reset password form', () => {
  render(<ResetPassword />);

  expect(screen.getByRole('heading', { name: /reset your password/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  const resetPasswordButton = screen.getByRole('button', { name: /reset password/i });
  expect(resetPasswordButton).toBeInTheDocument();
  expect(resetPasswordButton).toBeDisabled();
});

test('reset password disabled when entering invalid email', async () => {
  const invalidEmail = 'test@email';

  render(<ResetPassword />);

  const emailInput = screen.getByLabelText(/email address/i);
  const resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

  await act(async () => {
    userEvent.type(emailInput, invalidEmail);
    userEvent.click(resetPasswordButton);
  });

  expect(emailInput).toHaveValue(invalidEmail);
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  expect(resetPasswordButton).toBeDisabled();
});

test('reset password enabled when entering a valid email', async () => {
  const validEmail = 'test@email.com';

  render(<ResetPassword />);

  const emailInput = screen.getByLabelText(/email address/i);
  const resetPasswordButton = screen.getByRole('button', { name: /reset password/i });

  await act(async () => {
    userEvent.type(emailInput, validEmail);
  });

  expect(emailInput).toHaveValue(validEmail);
  expect(screen.queryByText(/invalid email/i)).not.toBeInTheDocument();
  expect(resetPasswordButton).toBeEnabled();
});
