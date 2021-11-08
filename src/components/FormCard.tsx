import { FC } from 'react';

import Paper from '@mui/material/Paper';

import LoadingOverlay from 'components/LoadingOverlay';
import ErrorAlert from 'components/ErrorAlert';

interface FormCardProps {
  isLoading?: boolean;
  loadingMessage?: string;
  maxWidth: string;
  showErrorMessage?: boolean;
}

const FormCard: FC<FormCardProps> = ({
  children,
  isLoading = false,
  loadingMessage = '',
  maxWidth,
  showErrorMessage = false,
}) => (
  <Paper
    elevation={1}
    sx={{
      width: '100%',
      maxWidth,
      position: 'relative',
    }}
  >
    {showErrorMessage && <ErrorAlert />}
    {isLoading && <LoadingOverlay message={loadingMessage} />}
    {children}
  </Paper>
);

export default FormCard;
