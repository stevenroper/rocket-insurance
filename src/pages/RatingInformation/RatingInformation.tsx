import { FC } from 'react';

import Paper from '@mui/material/Paper';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography, { TypographyProps } from '@mui/material/Typography';

import Grid from 'components/layout/Grid';

const RatingInformation = () => (
  <Paper elevation={1} sx={{ width: '100%', maxWidth: '40rem' }}>
    <Grid
      padding="2rem 1.5rem"
      gridTemplateColumns={{
        xs: '1fr',
        md: '1fr 1fr',
      }}
      gridTemplateAreas={{
        xs: `
          "nameTitle"
          "firstName"
          "lastName"
          "addressTitle"
          "line1"
          "line2"
          "city"
          "state"
          "zipCode"
        `,
        md: `
          "nameTitle nameTitle"
          "firstName lastName"
          "addressTitle addressTitle"
          "line1 line1"
          "line2 city"
          "state zipCode"
        `,
      }}
    >
      <GridSectionTitle gridArea="nameTitle">Name</GridSectionTitle>
      <GridTextField label="First name" gridArea="firstName" />
      <GridTextField label="Last name" gridArea="lastName" />
      <GridSectionTitle gridArea="addressTitle">Address</GridSectionTitle>
      <GridTextField label="Street address" gridArea="line1" />
      <GridTextField label="Apartment, unit, suite" gridArea="line2" />
      <GridTextField label="City" gridArea="city" />
      <GridTextField label="State" gridArea="state" />
      <GridTextField label="Zip code" gridArea="zipCode" />
    </Grid>
  </Paper>
);

type PropsWithGridArea<TProps> = TProps & {
  gridArea: string;
};

const GridTextField = ({
  gridArea,
  ...rest
}: PropsWithGridArea<TextFieldProps>) => (
  <TextField variant="outlined" sx={{ gridArea }} {...rest} />
);

const GridSectionTitle: FC<PropsWithGridArea<TypographyProps>> = ({
  children,
  gridArea,
  ...rest
}) => (
  <Typography variant="h6" component="h2" sx={{ gridArea }}>
    {children}
  </Typography>
);

export default RatingInformation;
