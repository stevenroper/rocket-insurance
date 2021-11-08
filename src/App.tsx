import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import { amber } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import * as paths from 'constants/paths';

import QuoteOverview from 'pages/QuoteOverview';
import RatingInformation from 'pages/RatingInformation';

function App() {
  return (
    <Box
      minHeight="calc(100vh - 2rem)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1rem"
      sx={{
        backgroundColor: amber[600],
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        fontWeight="700"
        marginBottom="2rem"
        color="#214e34"
        textAlign="center"
      >
        Rocket Insurance
      </Typography>
      <Switch>
        <Route path={paths.RATING_INFORMATION} component={RatingInformation} />
        <Route path={paths.QUOTE_OVERVIEW} component={QuoteOverview} />
        <Route path="*">
          <Redirect to="/rating-information" />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;