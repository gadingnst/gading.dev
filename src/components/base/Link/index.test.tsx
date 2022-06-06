import { render, screen } from '@testing-library/react';
import Link from '@/components/base/Link';

describe('<Link /> component test', () => {
  render(<Link href="https://gading.dev">Hello World</Link>);
  render(<Link href="https://gading.dev" disabled>Hello World</Link>);
  const links = screen.getAllByRole('link');

  it('should renders on document', () => {
    links.forEach(link => expect(link).toBeInTheDocument());
  });

  it('should renders text message', () => {
    expect(links[0]).toHaveTextContent('Hello World');
  });

  it('should has `href` prop', () => {
    expect(links[0]).toHaveAttribute('href', 'https://gading.dev');
  });

  it('should has `cursor-not-allowed` class on disabled link', () => {
    expect(links[1]).toHaveClass('cursor-not-allowed');
  });
});
