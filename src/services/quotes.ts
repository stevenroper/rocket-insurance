const QUOTES_ENDPOINT = 'https://fed-challenge-api.sure.now.sh/api/v1/quotes';
const BASE_CONFIG = {
  headers: {
    Accept: 'application/json',
  },
};

interface PolicyHolder {
  first_name: string;
  last_name: string;
}

interface Address {
  line_1: string;
  line_2?: string;
  city: string;
  region: string;
  postal: string;
}

interface VariableOption {
  title: string;
  description: string;
  values: number[];
}

interface VariableSelections {
  deductible: number;
  asteroid_collision: number;
}

export type CreateQuotePayload = PolicyHolder & {
  address: Address;
};

export interface UpdateQuotePayload {
  quote: {
    quoteId: string;
    rating_address: Address;
    policy_holder: PolicyHolder;
    variable_selections: VariableSelections;
  };
}

export interface QuoteResponse {
  quote: {
    quoteId: string;
    rating_address: Required<Address>;
    policy_holder: PolicyHolder;
    variable_options: {
      deductible: VariableOption;
      asteroid_collision: VariableOption;
    };
    variable_selections: VariableSelections;
    premium: number;
  };
}

export const createQuote = async (
  payload: CreateQuotePayload
): Promise<QuoteResponse> => {
  const res = await fetch(QUOTES_ENDPOINT, {
    ...BASE_CONFIG,
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateQuote = async (
  quoteId: string,
  payload: UpdateQuotePayload
): Promise<QuoteResponse> => {
  const res = await fetch(`${QUOTES_ENDPOINT}/${quoteId}`, {
    ...BASE_CONFIG,
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return res.json();
};
