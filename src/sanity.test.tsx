import { render, screen } from '@testing-library/react';

describe('Sanity Check', () => {
  it('runs jest and RTL properly', () => {
    render(<h1>Sanity Check Pass</h1>);
    expect(screen.getByRole('heading', { name: /sanity check pass/i })).toBeInTheDocument();
  });
});
