const QUOTES_ENDPOINT = 'https://fed-challenge-api.sure.now.sh/api/v1/quotes';
const BASE_CONFIG = {
  headers: {
    Accept: 'application/json',
  },
};

export interface CreateQuotePayload {
  first_name: string;
  last_name: string;
  address: {
    line_1: string;
    line_2?: string;
    city: string;
    region: string;
    postal: string;
  };
}

export interface QuoteResponse {
  quote: {
    quoteId: string;
    rating_address: {
      line_1: string;
      line_2: string;
      city: string;
      region: string;
      postal: string;
    };
    policy_holder: {
      first_name: string;
      last_name: string;
    };
    variable_options: {
      deductible: {
        title: string;
        description: string;
        values: number[];
      };
      asteroid_collision: {
        title: string;
        description: string;
        values: number[];
      };
    };
    variable_selections: {
      deductible: number;
      asteroid_collision: number;
    };
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
