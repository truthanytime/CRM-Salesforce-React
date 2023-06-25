import { render, screen } from 'test/test-utils';
import { initialRootState } from 'store/reducers';
import Account from './Account';

test('renders change password form', () => {
  const email = 'test@email.com';
  const initialState = { ...initialRootState, auth: { ...initialRootState.auth, email } };

  render(<Account />, { initialState });

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toHaveValue(email);
  expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
});
