import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { QuoteResponse } from 'services/quotes';

interface RenderWithAppProvidersOptions {
  initialEntries?: string[];
  mockQuoteData?: QuoteResponse;
}

export const renderWithAppProviders = (
  component: ReactNode,
  opts?: RenderWithAppProvidersOptions
) => {
  const queryClient = new QueryClient();
  if (opts?.mockQuoteData) {
    queryClient.setQueryData('quote', opts.mockQuoteData);
  }
  const history = createMemoryHistory({
    initialEntries: opts?.initialEntries ?? ['/'],
  });
  render(
    <Router history={history}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </Router>
  );

  return { history };
};
