import { FC } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

const Grid: FC<BoxProps> = ({ children, ...rest }) => (
  <Box display="grid" gap="1rem" {...rest}>
    {children}
  </Box>
);

export default Grid;
