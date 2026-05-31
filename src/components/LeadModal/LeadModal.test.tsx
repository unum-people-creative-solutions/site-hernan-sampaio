import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { LeadModal } from './LeadModal';
import { renderWithModal } from '@/test-utils';
import { useLead } from '@/context/LeadContext';
import * as crm from '@/lib/crm';
import userEvent from '@testing-library/user-event';

// Mock do hook useLead
jest.mock('@/context/LeadContext', () => ({
  ...jest.requireActual('@/context/LeadContext'),
  useLead: jest.fn(),
}));

// Mock do crm library
jest.mock('@/lib/crm', () => ({
  sendLeadToCRM: jest.fn(),
}));

// Mock de window.open
const originalOpen = window.open;
beforeAll(() => {
  window.open = jest.fn();
});

afterAll(() => {
  window.open = originalOpen;
});

describe('LeadModal Integration', () => {
  const mockCloseModal = jest.fn();
  const mockWhatsappUrl = 'https://wa.me/5541999999999?text=Test';
  const mockTracking = {
    gclid: 'test-gclid',
    fbclid: null,
    msclkid: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLead as jest.Mock).mockReturnValue({
      isOpen: true,
      closeModal: mockCloseModal,
      whatsappUrl: mockWhatsappUrl,
      tracking: mockTracking,
    });
  });

  it('should redirect to WhatsApp even if CRM call fails', async () => {
    const user = userEvent.setup();
    // Simula falha na API do CRM
    (crm.sendLeadToCRM as jest.Mock).mockRejectedValue(new Error('CRM API Error'));

    renderWithModal(<LeadModal />);

    // Preenche o formulário
    await user.type(screen.getByPlaceholderText(/DIGITE SEU NOME/i), 'Test User');
    
    // O IMask pode ser chato com user.type, vamos tentar preencher diretamente se falhar
    const phoneInput = screen.getByPlaceholderText(/\(00\) 00000-0000/i);
    await user.type(phoneInput, '41999999999');

    // Submete
    const submitButton = screen.getByRole('button', { name: /ENVIAR E FALAR COM HERNAN/i });
    await user.click(submitButton);

    // Verifica se window.open foi chamado com a URL correta apesar do erro no CRM
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(mockWhatsappUrl, '_blank', 'noopener,noreferrer');
    }, { timeout: 3000 });

    // Verifica se o modal foi fechado
    expect(mockCloseModal).toHaveBeenCalled();
    
    // Verifica se a tentativa de envio ao CRM ocorreu
    expect(crm.sendLeadToCRM).toHaveBeenCalled();
  });

  it('should redirect to WhatsApp on success', async () => {
    const user = userEvent.setup();
    (crm.sendLeadToCRM as jest.Mock).mockResolvedValue({ success: true });

    renderWithModal(<LeadModal />);

    await user.type(screen.getByPlaceholderText(/DIGITE SEU NOME/i), 'Test User');
    await user.type(screen.getByPlaceholderText(/\(00\) 00000-0000/i), '41999999999');

    const submitButton = screen.getByRole('button', { name: /ENVIAR E FALAR COM HERNAN/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(mockWhatsappUrl, '_blank', 'noopener,noreferrer');
    }, { timeout: 3000 });

    expect(crm.sendLeadToCRM).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
