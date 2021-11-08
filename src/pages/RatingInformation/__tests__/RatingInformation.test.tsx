import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createQuote } from 'services/quotes';

import { renderWithAppProviders } from 'testing/utils';
import mockQuoteData from 'testing/mocks/quote';

import RatingInformation from '../RatingInformation';

jest.mock('services/quotes');

describe('<RatingInformation />', () => {
  const renderRatingInformation = () =>
    renderWithAppProviders(<RatingInformation />);
  const selectState = async (stateName: string) => {
    userEvent.click(screen.getByLabelText('State'));
    userEvent.click(
      within(await screen.findByRole('listbox')).getByText(stateName)
    );
  };
  const submitForm = () => userEvent.click(screen.getByText('Get quote'));
  const fillForm = async (overrides?: {
    city?: string;
    firstName?: string;
    lastName?: string;
    line1?: string;
    line2?: string;
    zip?: string;
    state?: string;
  }) => {
    userEvent.paste(
      screen.getByLabelText('First name'),
      overrides?.firstName ?? 'Jon'
    );
    userEvent.paste(
      screen.getByLabelText('Last name'),
      overrides?.lastName ?? 'Snow'
    );
    userEvent.paste(
      screen.getByLabelText('Street address'),
      overrides?.line1 ?? '123 A Street'
    );
    userEvent.paste(screen.getByLabelText(/Apartment/), overrides?.line1 ?? '');
    userEvent.paste(
      screen.getByLabelText('City'),
      overrides?.city ?? 'Seattle'
    );
    userEvent.paste(
      screen.getByLabelText('Zip code'),
      overrides?.zip ?? '98101'
    );
    if (overrides?.state !== '') {
      await selectState(overrides?.state ?? 'Washington');
    }
  };

  beforeEach(() => {
    (createQuote as jest.Mock).mockResolvedValue(mockQuoteData);
  });

  it('should submit data to endpoint when form is valid and submitted', async () => {
    renderRatingInformation();

    await fillForm();
    submitForm();

    await waitFor(() => {
      expect(createQuote).toHaveBeenCalledTimes(1);
      expect(createQuote).toHaveBeenCalledWith({
        address: {
          city: 'Seattle',
          line_1: '123 A Street',
          line_2: '',
          postal: '98101',
          region: 'WA',
        },
        first_name: 'Jon',
        last_name: 'Snow',
      });
    });
  });

  describe('form validation', () => {
    it('should display error if first name is missing', async () => {
      renderRatingInformation();
      await fillForm({ firstName: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('First name').parentElement
              ?.parentElement as HTMLElement
          ).getByText('Please enter a first name to continue.')
        ).toBeInTheDocument();
      });
    });

    it('should display error if last name is missing', async () => {
      renderRatingInformation();
      await fillForm({ lastName: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('Last name').parentElement
              ?.parentElement as HTMLElement
          ).getByText('Please enter a last name to continue.')
        ).toBeInTheDocument();
      });
    });

    it('should display error if street address is missing', async () => {
      renderRatingInformation();
      await fillForm({ line1: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('Street address').parentElement
              ?.parentElement as HTMLElement
          ).getByText('Please enter a street address to continue.')
        ).toBeInTheDocument();
      });
    });

    it('should display error if city is missing', async () => {
      renderRatingInformation();
      await fillForm({ city: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('City').parentElement
              ?.parentElement as HTMLElement
          ).getByText('Please enter a city to continue.')
        ).toBeInTheDocument();
      });
    });

    it('should display error if state is missing', async () => {
      renderRatingInformation();
      await fillForm({ state: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('State').parentElement
              ?.parentElement as HTMLElement
          ).getByText('Please select a state to continue.')
        ).toBeInTheDocument();
      });
    });

    it('should display error if zip code is missing', async () => {
      renderRatingInformation();
      await fillForm({ zip: '' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('Zip code').parentElement
              ?.parentElement as HTMLElement
          ).getByText(/enter a valid, 5-digit zip/)
        ).toBeInTheDocument();
      });
    });

    it('should display error if zip code does not match expected pattern', async () => {
      renderRatingInformation();
      await fillForm({ zip: '123asd' });
      submitForm();

      await waitFor(() => {
        expect(createQuote).not.toHaveBeenCalled();
        expect(
          within(
            screen.getByLabelText('Zip code').parentElement
              ?.parentElement as HTMLElement
          ).getByText(/enter a valid, 5-digit zip/)
        ).toBeInTheDocument();
      });
    });
  });
});
