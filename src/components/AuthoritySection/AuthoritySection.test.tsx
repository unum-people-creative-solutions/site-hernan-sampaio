import { render, screen } from '@testing-library/react';
import { AuthoritySection } from './AuthoritySection';

describe('AuthoritySection Component', () => {
  it('renders the section with image and text content', () => {
    render(<AuthoritySection />);
    
    // Verifica imagem da familia e textos chave (TDD-First)
    expect(screen.getByRole('heading', { level: 2, name: /o treinador/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /hernan sampaio e sua família/i })).toBeInTheDocument();
    
    // Procura por menções a biomecânica e academia Aquatikus
    expect(screen.getByText(/biomecânica/i)).toBeInTheDocument();
    expect(screen.getByText(/aquatikus/i)).toBeInTheDocument();
  });
});
