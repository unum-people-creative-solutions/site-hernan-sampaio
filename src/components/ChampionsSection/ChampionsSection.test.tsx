import { render, screen } from '@testing-library/react';
import { ChampionsSection } from './ChampionsSection';

describe('ChampionsSection Component', () => {
  it('renders both champion profiles with correct images and titles', () => {
    render(<ChampionsSection />);
    
    // Verifica Robert Dias (O Atleta)
    expect(screen.getByRole('heading', { name: /robert dias/i })).toBeInTheDocument();
    expect(screen.getByText(/bicampeão paranaense/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /robert dias/i })).toBeInTheDocument();

    // Verifica Grazi Lobo (A Atleta)
    expect(screen.getByRole('heading', { name: /grazi lobo/i })).toBeInTheDocument();
    expect(screen.getByText(/vice-campeã copa sul/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /grazi lobo/i })).toBeInTheDocument();
  });
});
