import { screen } from '@testing-library/react';
import { ServicesSection } from './ServicesSection';
import { renderWithModal } from '@/test-utils';

describe('ServicesSection Component', () => {
  it('renders the services list with the three main offerings', () => {
    renderWithModal(<ServicesSection />);
    
    // Validar seção
    expect(screen.getByRole('heading', { level: 2, name: /modelos de atuação/i })).toBeInTheDocument();
    
    // Validar lista semântica
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    // Validar os 3 serviços
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    expect(screen.getByText(/consultoria online/i)).toBeInTheDocument();
    expect(screen.getByText(/treinamento presencial/i)).toBeInTheDocument();
    expect(screen.getByText(/preparação de atletas/i)).toBeInTheDocument();
  });
});
