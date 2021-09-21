import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button from '../src';

it('is accessible', async () => {
  const { container } = render(<Button>text</Button>);
  expect(await axe(container)).toHaveNoViolations();
});

it('renders button with text', () => {
  const text = 'text';
  render(<Button>{text}</Button>);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(screen.getByRole('button', { name: text })).toBeInTheDocument();
});
