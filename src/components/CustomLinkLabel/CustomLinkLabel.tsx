import { Box, IconButton, Link, LinkProps, Typography } from '@mui/material';
import { ReactComponent as LaunchIcon } from 'assets/icons/launch.svg';
import { FC } from 'react';
type Props = LinkProps & { withIcon?: boolean; captionText?: string; linkText: string };

const CustomLinkLabel: FC<Props> = ({ ...props }) => {
  const { withIcon, captionText, linkText, ...linkProps } = props;
  const TextValueSpan: FC<{ children: any }> = ({ children }) => (
    <Typography component="span" sx={{ fontSize: '14px', lineHeight: '24px', color: 'neutral.main' }}>
      {children}
    </Typography>
  );
  return (
    <Box>
      <TextValueSpan>{captionText && String(captionText) + ' '}</TextValueSpan>
      <Link {...linkProps}>
        <Typography component="span" variant="body2" letterSpacing={0}>
          {linkText}
          {withIcon && (
            <IconButton edge="start" aria-label="launch" sx={{ pl: '15px' }}>
              <LaunchIcon />
            </IconButton>
          )}
        </Typography>
      </Link>
    </Box>
  );
};

CustomLinkLabel.defaultProps = { underline: 'none', target: '_blank', rel: 'noreferrer' };

export default CustomLinkLabel;
