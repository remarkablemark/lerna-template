import { render, screen } from '@testing-library/react';

import Button from '../src';

it('renders button', () => {
  const text = 'text';
  render(<Button>{text}</Button>);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
});
