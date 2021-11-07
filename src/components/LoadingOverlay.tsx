import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoadingOverlayProps {
  message?: string;
}

const LoadingOverlay = ({ message }: LoadingOverlayProps) => (
  <Box
    position="absolute"
    height="100%"
    width="100%"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    zIndex="100"
    sx={{ backdropFilter: 'blur(5px)' }}
  >
    <Box
      height="100%"
      width="100%"
      sx={{ backgroundColor: 'white', opacity: 0.75, position: 'absolute' }}
    />
    {message && (
      <Typography
        variant="h5"
        textAlign="center"
        zIndex="200"
        marginBottom="1rem"
      >
        {message}
      </Typography>
    )}
    <CircularProgress />
  </Box>
);

export default LoadingOverlay;
