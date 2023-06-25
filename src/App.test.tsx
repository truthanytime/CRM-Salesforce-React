import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the connected app without crashing', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
});
