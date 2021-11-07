import { Redirect, useHistory } from 'react-router-dom';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { DevTool as ReactHookFormDevtools } from '@hookform/devtools';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

import LoadingOverlay from 'components/LoadingOverlay';

import { RATING_INFORMATION } from 'constants/paths';
import { IS_DEV } from 'constants/environment';

import {
  useAppState,
  useUpdateQuote,
  UpdateQuoteCoverageVariableKeys,
  UseUpdateQuotePayload,
} from 'services/rq-hooks';

import { formatCurrency } from 'utils/format';

interface QuotingOverviewFormData {
  deductible: number;
  asteroid_collision: number;
}

const QuotingOverview = () => {
  const { clearState, state } = useAppState();
  const { isLoading, mutate: updateQuote } = useUpdateQuote();
  const { push } = useHistory();
  const useFormMethods = useForm<QuotingOverviewFormData>({
    defaultValues: {
      deductible: state?.quote?.variable_selections?.deductible,
      asteroid_collision: state?.quote?.variable_selections?.asteroid_collision,
    },
  });

  if (!state?.quote) return <Redirect to={RATING_INFORMATION} />;

  return (
    <>
      <Paper
        elevation={1}
        sx={{ width: '100%', maxWidth: '30rem', position: 'relative' }}
      >
        {isLoading && <LoadingOverlay message="Updating quote" />}
        <Box padding="2rem 1.5rem">
          <Typography variant="h4" component="h2" textAlign="center">
            Your Quote
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="1rem"
            border={`1px solid ${grey[300]}`}
            marginY="1rem"
          >
            <Typography variant="h5" component="h3" marginBottom="0.5rem">
              Yearly Premium
            </Typography>
            <Typography
              variant="h3"
              component="p"
              fontWeight="500"
              color="#214e34"
            >
              {formatCurrency(state?.quote?.premium)}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="h3"
            margin="2rem 0 1rem 0"
            textAlign="center"
          >
            Adjust policy coverage variables
          </Typography>
          <FormProvider {...useFormMethods}>
            <PolicyCoverageVariableSelect
              name="deductible"
              onChange={updateQuote}
              disabled={isLoading}
            />
            <PolicyCoverageVariableSelect
              name="asteroid_collision"
              onChange={updateQuote}
              disabled={isLoading}
            />
          </FormProvider>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => {
                push(RATING_INFORMATION);
                clearState();
              }}
            >
              Restart quote
            </Button>
          </Box>
        </Box>
      </Paper>
      {IS_DEV && <ReactHookFormDevtools control={useFormMethods.control} />}
    </>
  );
};

interface PolicyCoverageVariableSelectProps {
  disabled?: boolean;
  name: UpdateQuoteCoverageVariableKeys;
  onChange(data: UseUpdateQuotePayload): void;
}

const PolicyCoverageVariableSelect = ({
  disabled = false,
  name,
  onChange,
}: PolicyCoverageVariableSelectProps) => {
  const { control } = useFormContext<QuotingOverviewFormData>();
  const { state } = useAppState();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ marginBottom: '0.5rem' }}>
            <InputLabel id={`${name}-select`}>
              {state?.quote?.variable_options?.[name]?.title}
            </InputLabel>
            <Select
              labelId={`${name}-select`}
              label={state?.quote?.variable_options?.[name]?.title}
              disabled={disabled}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                // TODO fix to remove casting
                onChange({ [name]: e.target.value } as UseUpdateQuotePayload);
              }}
            >
              {(state?.quote?.variable_options?.[name]?.values ?? []).map(
                (val) => (
                  <MenuItem key={val} value={val}>
                    {formatCurrency(val)}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        )}
      />
      <Typography variant="caption" component="p" marginBottom="2rem">
        {state?.quote?.variable_options?.[name]?.description}
      </Typography>
    </>
  );
};

export default QuotingOverview;
