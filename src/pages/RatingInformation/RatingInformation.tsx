import { FC } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool as ReactHookFormDevtools } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Box from '@mui/material/Box';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import FormCard from 'components/FormCard';

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
  const { mutate: createQuote, isLoading, isError } = useCreateQuote();
  const useFormMethods = useForm<RatingInformationFormData>({
    defaultValues: {
      [RATING_INFO_FORM_KEYS.firstName]: '',
      [RATING_INFO_FORM_KEYS.lastName]: '',
      [RATING_INFO_FORM_KEYS.line1]: '',
      [RATING_INFO_FORM_KEYS.line2]: '',
      [RATING_INFO_FORM_KEYS.city]: '',
      [RATING_INFO_FORM_KEYS.state]: '',
      [RATING_INFO_FORM_KEYS.zipCode]: '',
    },
    resolver: yupResolver(formValidation),
  });
  const stateSelectError =
    useFormMethods?.formState?.errors?.[RATING_INFO_FORM_KEYS.state]?.message;

  return (
    <>
      <FormCard
        isLoading={isLoading}
        loadingMessage="Generating quote"
        maxWidth="40rem"
        showErrorMessage={isError}
      >
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
              <GridSectionTitle gridArea="addressTitle">
                Address
              </GridSectionTitle>
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
                    <Select
                      labelId="state-dropdown"
                      label="State"
                      error={Boolean(stateSelectError)}
                      {...field}
                    >
                      {US_STATES.map((state) => (
                        <MenuItem key={state.code} value={state.code}>
                          {state.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                    {Boolean(stateSelectError) && (
                      <FormHelperText error>{stateSelectError}</FormHelperText>
                    )}
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
                  disabled={
                    isLoading ||
                    (useFormMethods.formState.isSubmitted &&
                      !useFormMethods.formState.isValid)
                  }
                >
                  Get quote
                </Button>
              </Box>
            </Grid>
          </form>
        </FormProvider>
      </FormCard>
      {IS_DEV && <ReactHookFormDevtools control={useFormMethods.control} />}
    </>
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
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.[name]?.message;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          variant="outlined"
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          sx={{ gridArea }}
          {...field}
          {...rest}
        />
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

const formValidation = yup.object({
  [RATING_INFO_FORM_KEYS.firstName]: yup
    .string()
    .required('Please enter a first name to continue.'),
  [RATING_INFO_FORM_KEYS.lastName]: yup
    .string()
    .required('Please enter a last name to continue.'),
  [RATING_INFO_FORM_KEYS.line1]: yup
    .string()
    .required('Please enter a street address to continue.'),
  [RATING_INFO_FORM_KEYS.line2]: yup.string(),
  [RATING_INFO_FORM_KEYS.city]: yup
    .string()
    .required('Please enter a city to continue.'),
  [RATING_INFO_FORM_KEYS.state]: yup
    .string()
    .required('Please select a state to continue.'),
  [RATING_INFO_FORM_KEYS.zipCode]: yup
    .string()
    .matches(/^\d{5}$/, 'Please enter a valid, 5-digit zip code to continue.')
    .required('Please enter a zip code to continue.'),
});

export default RatingInformation;
