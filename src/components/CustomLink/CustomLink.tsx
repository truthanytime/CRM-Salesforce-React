import { FC } from 'react';
import { Typography } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

const CustomLink: FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <Typography component="span" variant="labelRegular12" sx={{ color: 'primary.main' }}>
        {children}
      </Typography>
    </Link>
  );
};

export default CustomLink;
