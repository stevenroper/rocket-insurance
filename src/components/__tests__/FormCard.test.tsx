import { render, screen } from '@testing-library/react';

import FormCard, { FormCardProps } from '../FormCard';

describe('<FormCard />', () => {
  const renderFormCard = (props?: Partial<FormCardProps>) =>
    render(
      <FormCard maxWidth="30rem" {...props}>
        <div>My form</div>
      </FormCard>
    );

  it('should show loading indicator with message when isLoading is true', () => {
    renderFormCard({
      isLoading: true,
      loadingMessage: 'Generating details...',
    });
    expect(screen.getByText('Generating details...')).toBeInTheDocument();
  });

  it('should show error banner if showErrorMessage is true', () => {
    renderFormCard({ showErrorMessage: true });
    expect(screen.getByText(/Oops, something went wrong/)).toBeInTheDocument();
  });
});
