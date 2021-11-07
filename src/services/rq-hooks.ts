import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { QUOTE_OVERVIEW } from 'constants/paths';

import { createQuote, CreateQuotePayload, QuoteResponse } from './quotes';

export const useAppState = (): {
  state: QuoteResponse | undefined;
  updateState: (newData: QuoteResponse) => void;
} => {
  const queryClient = useQueryClient();
  const { data: state } = useQuery('quote', () =>
    queryClient.getQueryData<QuoteResponse>('quote')
  );
  const updateState = (newState: any) =>
    queryClient.setQueryData('quote', newState);
  return { state, updateState };
};

export const useCreateQuote = () => {
  const { push } = useHistory();
  const { updateState } = useAppState();

  return useMutation<QuoteResponse, unknown, CreateQuotePayload, unknown>(
    createQuote,
    {
      onSuccess: (data) => {
        updateState(data);
        push(QUOTE_OVERVIEW);
      },
    }
  );
};
