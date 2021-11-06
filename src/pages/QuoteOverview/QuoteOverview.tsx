import { useAppState } from 'services/rq-hooks';

const QuotingOverview = () => {
  const { state } = useAppState();
  return <pre>{JSON.stringify(state, undefined, 2)}</pre>;
};

export default QuotingOverview;
