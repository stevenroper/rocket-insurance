import { FC } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool as ReactHookFormDevtools } from '@hookform/devtools';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import LoadingOverlay from 'components/LoadingOverlay';

import { IS_DEV } from 'constants/environment';
import { US_STATES } from 'constants/enums';

import Grid from 'components/layout/Grid';

import { useCreateQuote } from 'services/rq-hooks';

const RATING_INFO_FORM_KEYS = {
  firstName: 'firstName',
  lastName: 'lastName',
  line1: 'line1',
  line2: 'line2',
  city: 'city',
  state: 'state',
  zipCode: 'zipCode',
} as const;

type RatingInformationFormData = Record<
  typeof RATING_INFO_FORM_KEYS[keyof typeof RATING_INFO_FORM_KEYS],
  string
>;

const RatingInformation = () => {
  const { mutate: createQuote, isLoading } = useCreateQuote();
  const useFormMethods = useForm<RatingInformationFormData>({
    defaultValues: {
      [RATING_INFO_FORM_KEYS.firstName]: 'Test',
      [RATING_INFO_FORM_KEYS.lastName]: 'One',
      [RATING_INFO_FORM_KEYS.line1]: '123 A Street',
      [RATING_INFO_FORM_KEYS.line2]: '',
      [RATING_INFO_FORM_KEYS.city]: 'SLC',
      [RATING_INFO_FORM_KEYS.state]: 'UT',
      [RATING_INFO_FORM_KEYS.zipCode]: '84101',
    },
  });

  return (
    <Paper
      elevation={1}
      sx={{
        width: '100%',
        maxWidth: '40rem',
        position: 'relative',
      }}
    >
      {isLoading && <LoadingOverlay message="Generating quote" />}
      <FormProvider {...useFormMethods}>
        <form
          onSubmit={useFormMethods.handleSubmit((data) =>
            createQuote({
              first_name: data[RATING_INFO_FORM_KEYS.firstName],
              last_name: data[RATING_INFO_FORM_KEYS.lastName],
              address: {
                line_1: data[RATING_INFO_FORM_KEYS.line1],
                line_2: data[RATING_INFO_FORM_KEYS.line2],
                city: data[RATING_INFO_FORM_KEYS.city],
                region: data[RATING_INFO_FORM_KEYS.state],
                postal: data[RATING_INFO_FORM_KEYS.zipCode],
              },
            })
          )}
        >
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
          "submitButton"
        `,
              md: `
          "nameTitle nameTitle"
          "firstName lastName"
          "addressTitle addressTitle"
          "line1 line1"
          "line2 city"
          "state zipCode"
          "submitButton submitButton"
        `,
            }}
          >
            <GridSectionTitle gridArea="nameTitle">Name</GridSectionTitle>
            <GridTextField
              label="First name"
              gridArea="firstName"
              name={RATING_INFO_FORM_KEYS.firstName}
              disabled={isLoading}
            />
            <GridTextField
              label="Last name"
              gridArea="lastName"
              name={RATING_INFO_FORM_KEYS.lastName}
              disabled={isLoading}
            />
            <GridSectionTitle gridArea="addressTitle">Address</GridSectionTitle>
            <GridTextField
              label="Street address"
              gridArea="line1"
              name={RATING_INFO_FORM_KEYS.line1}
              disabled={isLoading}
            />
            <GridTextField
              label="Apartment, unit, suite"
              gridArea="line2"
              name={RATING_INFO_FORM_KEYS.line2}
              disabled={isLoading}
            />
            <GridTextField
              label="City"
              gridArea="city"
              name={RATING_INFO_FORM_KEYS.city}
              disabled={isLoading}
            />
            <Controller
              name={RATING_INFO_FORM_KEYS.state}
              control={useFormMethods.control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="state-dropdown">State</InputLabel>
                  <Select labelId="state-dropdown" label="State" {...field}>
                    {US_STATES.map((state) => (
                      <MenuItem key={state.code} value={state.code}>
                        {state.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <GridTextField
              label="Zip code"
              gridArea="zipCode"
              name={RATING_INFO_FORM_KEYS.zipCode}
              disabled={isLoading}
            />
            <Box
              display="flex"
              justifyContent="center"
              marginTop="1rem"
              sx={{
                gridArea: 'submitButton',
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ width: { xs: '100%', md: 'fit-content' } }}
                disabled={isLoading}
              >
                Get quote
              </Button>
            </Box>
          </Grid>
          {IS_DEV && <ReactHookFormDevtools control={useFormMethods.control} />}
        </form>
      </FormProvider>
    </Paper>
  );
};

type PropsWithGridArea<TProps> = TProps & {
  gridArea: string;
};

type GridTextFieldProps = TextFieldProps & {
  name: string;
};

const GridTextField = ({
  gridArea,
  name,
  ...rest
}: PropsWithGridArea<GridTextFieldProps>) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField variant="outlined" sx={{ gridArea }} {...field} {...rest} />
      )}
    />
  );
};

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
