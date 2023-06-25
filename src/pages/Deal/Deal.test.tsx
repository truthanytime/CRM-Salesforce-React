import { render, screen } from 'test/test-utils';
import { initialRootState } from 'store/reducers';
import Deal from './Deal';

test('renders change password form', () => {
  const email = 'test@email.com';
  const initialState = { ...initialRootState, auth: { ...initialRootState.auth, email } };

  render(<Deal />, { initialState });

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toHaveValue(email);
  expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
});
