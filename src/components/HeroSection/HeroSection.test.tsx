import { screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';
import { renderWithModal } from '@/test-utils';

describe('HeroSection Component', () => {
  it('renders the main heading and CTA button', () => {
    renderWithModal(<HeroSection />);
    
    // Verificações de acessibilidade (Regra: TDD-first baseada no GEMINI.md)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar minha preparação/i })).toBeInTheDocument();
  });

  it('renders the background video properly', () => {
    const { container } = renderWithModal(<HeroSection />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/vidro assistencia.mp4');
  });
});
