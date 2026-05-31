import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { LeadProvider } from '@/context/LeadContext';

export const renderWithModal = (ui: ReactNode) => {
  return render(
    <LeadProvider>
      {ui}
    </LeadProvider>
  );
};
