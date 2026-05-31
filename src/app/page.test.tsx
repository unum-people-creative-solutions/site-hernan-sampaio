import { screen } from '@testing-library/react';
import Home from './page';
import { renderWithModal } from '@/test-utils';

describe('Home Page Assembly', () => {
  it('renders all semantic regions of the landing page', () => {
    renderWithModal(<Home />);
    
    // De acordo com as diretrizes ARIA que adicionamos nos componentes:
    expect(screen.getByRole('region', { name: /apresentação principal/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /sobre o treinador/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /hall de campeões/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /serviços oferecidos/i })).toBeInTheDocument();
    
    // Verifica o Footer e a Logo
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
