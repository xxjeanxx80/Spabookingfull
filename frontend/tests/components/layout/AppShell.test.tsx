import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';
import { LocaleProvider } from '@/providers/LocaleProvider';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

describe('AppShell', () => {
  it('renders navigation links for each persona', () => {
    render(
      <Wrapper>
        <AppShell>
          <div>content</div>
        </AppShell>
      </Wrapper>
    );

    expect(screen.getByText('Beauty Booking Hub')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Spa Owner')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });
});
