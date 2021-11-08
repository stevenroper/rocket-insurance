import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, renderHook } from '@testing-library/react-hooks';
import { Router } from 'react-router';
import { createMemoryHistory, History } from 'history';

import { QUOTE_OVERVIEW } from 'constants/paths';

import { createQuote, updateQuote } from 'services/quotes';

import mockQuoteData from 'testing/mocks/quote';

import * as rqHooks from '../rq-hooks';

jest.mock('services/quotes');

describe('rq-hooks', () => {
  let history: History;

  const wrapper: FC = ({ children }) => {
    const queryClient = new QueryClient();
    return (
      <Router history={history}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Router>
    );
  };

  const renderCustomHook = (hook: Function) => {
    const helpers = renderHook(() => hook(), { wrapper });
    return {
      ...helpers,
      waitForSuccess: () =>
        helpers.waitFor(() => helpers.result.current.isSuccess, {
          timeout: 10000,
        }),
    };
  };

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] });
  });

  describe('useAppState()', () => {
    const renderUseAppState = () => renderCustomHook(rqHooks.useAppState);

    it('should initialize state as undefined', async () => {
      const { result, waitForSuccess } = renderUseAppState();
      await waitForSuccess();
      expect(result.current.state).toEqual(undefined);
    });

    it('should update state when using "updateState"', async () => {
      const { result, waitForSuccess } = renderUseAppState();
      await waitForSuccess();

      expect(result.current.state).toEqual(undefined);
      act(() => {
        result.current.updateState(mockQuoteData);
      });

      await waitForSuccess();
      expect(result.current.state).toEqual(mockQuoteData);
    });

    it('should clear any state when using "clearState"', async () => {
      const { result, waitForSuccess } = renderUseAppState();
      await waitForSuccess();

      expect(result.current.state).toEqual(undefined);
      act(() => {
        result.current.updateState(mockQuoteData);
      });

      await waitForSuccess();
      expect(result.current.state).toEqual(mockQuoteData);

      act(() => {
        result.current.clearState();
      });

      await waitForSuccess();
      expect(result.current.state).toEqual(undefined);
    });
  });

  describe('useCreateQuote()', () => {
    it('should call endpoint with correct payload and redirects to Quote Overview page on success', async () => {
      (createQuote as jest.Mock).mockResolvedValue(mockQuoteData);
      const testPayload = {
        first_name: 'Jon',
        last_name: 'Snow',
        address: {
          city: 'Seattle',
          line_1: '123 A Street',
          line_2: 'APT A',
          postal: '12345',
          region: 'WA',
        },
      };

      // Definitely a bit janky, but it does allow me to use/test both hooks
      const { result, waitFor } = renderCustomHook(() => ({
        useAppState: rqHooks.useAppState(),
        useCreateQuote: rqHooks.useCreateQuote(),
      }));

      act(() => {
        result.current.useCreateQuote.mutate(testPayload);
      });
      await waitFor(() => result.current.useCreateQuote.isSuccess);

      expect(createQuote).toHaveBeenCalledTimes(1);
      expect(createQuote).toHaveBeenCalledWith(testPayload);
      expect(history.location.pathname).toContain(QUOTE_OVERVIEW);
      expect(result.current.useAppState.state).toEqual(mockQuoteData);
    });
  });

  describe('useUpdateQuote()', () => {
    it('should call endpoint with correct payload and update state with response', async () => {
      (updateQuote as jest.Mock).mockResolvedValue({
        ...mockQuoteData,
        quote: { ...mockQuoteData, premium: 25000 },
      });

      // Definitely a bit janky, but it does allow me to use/test both hooks
      const { result, waitFor } = renderCustomHook(() => ({
        useAppState: rqHooks.useAppState(),
        useUpdateQuote: rqHooks.useUpdateQuote(),
      }));

      await waitFor(() => result.current.useAppState.isSuccess);
      act(() => {
        result.current.useAppState.updateState(mockQuoteData);
      });
      await waitFor(() => result.current.useAppState.isSuccess);

      act(() => {
        result.current.useUpdateQuote.mutate({
          asteroid_collision: 1000000,
        });
      });
      await waitFor(() => result.current.useUpdateQuote.isSuccess);

      expect(updateQuote).toHaveBeenCalledTimes(1);
      expect(updateQuote).toHaveBeenCalledWith(mockQuoteData.quote.quoteId, {
        quote: {
          quoteId: mockQuoteData.quote.quoteId,
          policy_holder: mockQuoteData.quote.policy_holder,
          rating_address: mockQuoteData.quote.rating_address,
          variable_selections: {
            ...mockQuoteData.quote.variable_selections,
            asteroid_collision: 1000000,
          },
        },
      });
      expect(result.current.useAppState.state).toHaveProperty(
        'quote.premium',
        25000
      );
    });
  });
});
