import { QuoteResponse } from 'services/quotes';

const mockQuoteData: QuoteResponse = {
  quote: {
    quoteId: 'UP3653468',
    rating_address: {
      line_1: '123 A Street',
      line_2: '',
      city: 'New York',
      region: 'NY',
      postal: '10001',
    },
    policy_holder: { first_name: 'Jon', last_name: 'Snow' },
    variable_options: {
      deductible: {
        title: 'Deductible',
        description:
          'The amount of money you will pay in an insurance claim before the insurance coverage kicks in.',
        values: [500, 1000, 2000],
      },
      asteroid_collision: {
        title: 'Asteroid Collision Limit',
        description:
          'The maximum amount covered for damages caused by asteroid collisions.',
        values: [100000, 300000, 500000, 1000000],
      },
    },
    variable_selections: { deductible: 500, asteroid_collision: 100000 },
    premium: 2000,
  },
};

export default mockQuoteData;
