import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as paths from 'constants/paths';

import { updateQuote } from 'services/quotes';

import mockQuoteData from 'testing/mocks/quote';
import { renderWithAppProviders } from 'testing/utils';

import QuoteOverview from '../QuoteOverview';

jest.mock('services/quotes');

describe('<QuoteOverview />', () => {
  const renderQuoteOverview = () =>
    renderWithAppProviders(<QuoteOverview />, {
      initialEntries: [paths.QUOTE_OVERVIEW],
      mockQuoteData,
    });

  it('should render correct data from quote', async () => {
    renderQuoteOverview();

    await waitFor(() => {
      expect(screen.getByText('$2,000', { selector: 'p' })).toBeInTheDocument();
      expect(screen.getByLabelText('Deductible')).toHaveTextContent('$500');
      expect(
        screen.getByLabelText('Asteroid Collision Limit')
      ).toHaveTextContent('$100,000');
    });
  });

  it('should route to Rating Info page when "Restart Quote" button is clicked', async () => {
    const { history } = renderQuoteOverview();
    userEvent.click(await screen.findByText('Restart quote'));

    await waitFor(() => {
      expect(history.location.pathname).toContain(paths.RATING_INFORMATION);
    });
  });

  it('should call update endpoint via mutation when a new value is selected from one of the dropdowns', async () => {
    (updateQuote as jest.Mock).mockResolvedValue({
      ...mockQuoteData,
      quote: { ...mockQuoteData.quote, premium: 10000 },
    });

    renderQuoteOverview();
    userEvent.click(await screen.findByLabelText('Deductible'));
    userEvent.click(
      within(await screen.findByRole('listbox')).getByText('$2,000')
    );

    await waitFor(() => {
      expect(updateQuote).toHaveBeenCalledTimes(1);
      expect(screen.getByLabelText('Deductible')).toHaveTextContent('$2,000');
      expect(
        screen.getByText('$10,000', { selector: 'p' })
      ).toBeInTheDocument();
    });
  });
});
