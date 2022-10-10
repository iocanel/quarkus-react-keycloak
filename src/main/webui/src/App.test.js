import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo app heading', () => {
  render(<App />);
  const element = screen.getByText(/todo app/i);
  expect(element).toBeInTheDocument();
});
