import { render, screen } from '@testing-library/react';

import Component from '../src';

it('renders text', () => {
  const text = 'text';
  render(<Component>{text}</Component>);
  expect(screen.getByText(text)).toBeInTheDocument();
});
