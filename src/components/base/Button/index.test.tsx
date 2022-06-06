import { render, screen } from '@testing-library/react';
import Button from '@/components/base/Button';

describe('<Button /> component test', () => {
  render(<Button text="Hello World" />);
  render(<Button href="https://gading.dev" text="Hello World" />);

  const btn = screen.getByRole('button');
  const link = screen.getByRole('link');

  it('should renders on document', () => {
    expect(btn).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it('should renders tag BUTTON and text message', () => {
    expect(btn.tagName).toEqual('BUTTON');
    expect(btn).toHaveTextContent('Hello World');
  });

  it('should renders tag A and has href prop', () => {
    expect(link.tagName).toEqual('A');
    expect(link).toHaveAttribute('href', 'https://gading.dev');
  });
});
