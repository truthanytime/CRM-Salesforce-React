import { render, screen } from 'test/test-utils';
import CreateCompany from './CreateCompany';

test('renders create company form', () => {
  render(<CreateCompany />);

  expect(screen.getByLabelText(/company name\*/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/company address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/billing address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/account owner\*/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/e-mail address\*/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add & send e-mail/i })).toBeInTheDocument();
});
