import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import { QUOTE_OVERVIEW } from 'constants/paths';

import {
  createQuote,
  CreateQuotePayload,
  QuoteResponse,
  updateQuote,
  UpdateQuotePayload,
} from './quotes';

export const useAppState = (): {
  state: QuoteResponse | undefined;
  updateState: (newData: QuoteResponse) => void;
  clearState: () => void;
} => {
  const queryClient = useQueryClient();
  const { data: state } = useQuery(
    'quote',
    () => queryClient.getQueryData<QuoteResponse>('quote'),
    { staleTime: Infinity, cacheTime: Infinity }
  );
  const updateState = (newState: any) =>
    queryClient.setQueryData('quote', newState);
  const clearState = () => queryClient.removeQueries('quote');

  return { clearState, state, updateState };
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

export type UpdateQuoteCoverageVariableKeys =
  | 'deductible'
  | 'asteroid_collision';
export type UseUpdateQuotePayload = Record<
  UpdateQuoteCoverageVariableKeys,
  number
>;

export const useUpdateQuote = () => {
  const { state, updateState } = useAppState();

  return useMutation<QuoteResponse, unknown, UseUpdateQuotePayload, unknown>(
    (newVariableSelections) =>
      // TODO update to remove casting
      updateQuote(
        state?.quote?.quoteId as string,
        {
          quote: {
            quoteId: state?.quote?.quoteId,
            rating_address: state?.quote?.rating_address,
            policy_holder: state?.quote?.policy_holder,
            variable_selections: {
              ...state?.quote?.variable_selections,
              ...newVariableSelections,
            },
          },
        } as UpdateQuotePayload
      ),
    {
      onSuccess: (data) => updateState(data),
    }
  );
};
