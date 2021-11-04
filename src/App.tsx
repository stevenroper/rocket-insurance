import { Switch, Route, Redirect } from 'react-router-dom';

import QuoteOverview from 'pages/QuoteOverview';
import RatingInformation from 'pages/RatingInformation';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/rating-information" component={RatingInformation} />
        <Route path="/quote-overview" component={QuoteOverview} />
        <Route path="*">
          <Redirect to="/rating-information" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
