import { FC, ReactNode } from 'react';
import { Grid, Typography, Box, Link as MuiLink, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import './AuthLayout.css';

import { PUBLIC_ABS_ROUTE_PATHS } from 'core/constants';
import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import { ReactComponent as WhiteLogo } from 'assets/icons/whiteLogo.svg';
import {
  Container,
  ContentContainer,
  ContentFooter,
  ContentHeader,
  BackButton,
  CenteredContainer,
  GridContainer,
  HeaderLeftContent,
  VerticalDivider,
} from './ui';

interface AuthLayoutProps {
  children: ReactNode;
  backButtonEnabled?: boolean;
  onGoBack?: () => void;
  currentStep?: number;
  totalSteps?: number;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  backButtonEnabled = false,
  currentStep,
  totalSteps,
  onGoBack,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const handleGoBack = () => {
    if (onGoBack) onGoBack();
    else navigate(-1);
  };

  return (
    <Container className="AuthLayoutContainer">
      <GridContainer container>
        <Grid item xs={12} md={6}>
          <ContentContainer>
            <ContentHeader>
              <HeaderLeftContent paddingLeft={backButtonEnabled ? '65px' : '0px'}>
                {backButtonEnabled && (
                  <BackButton onClick={handleGoBack} startIcon={<NavBackIcon />}>
                    Back
                  </BackButton>
                )}

                {currentStep && totalSteps && (
                  <>
                    <VerticalDivider />

                    <Typography variant="labelRegular10">
                      STEP {currentStep} / {totalSteps}
                    </Typography>
                  </>
                )}
              </HeaderLeftContent>

              <Typography variant="labelRegular12" textAlign="right" component="p" alignItems="center" display="flex">
                Don&apos;t have an account?&nbsp;
                <Link to={PUBLIC_ABS_ROUTE_PATHS.login}>
                  <MuiLink style={{ textDecoration: 'none' }} component="span">
                    Sign up
                  </MuiLink>
                </Link>
              </Typography>
            </ContentHeader>

            <CenteredContainer flex="1">
              {smallDevice && (
                <Box marginBottom={5}>
                  <WhiteLogo />
                </Box>
              )}

              {children}
            </CenteredContainer>

            <ContentFooter>
              <Typography variant="labelRegular12" textAlign="center" component="p">
                © 2022 сustomercity.com, inc. All rights reserved. |{' '}
                <Link to={PUBLIC_ABS_ROUTE_PATHS.login}>
                  <MuiLink style={{ textDecoration: 'none' }} component="span">
                    Privacy
                  </MuiLink>
                </Link>
              </Typography>
            </ContentFooter>
          </ContentContainer>
        </Grid>

        {!smallDevice && (
          <Grid item xs={12} md={6}>
            <ContentContainer>
              <ContentHeader>
                <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.white' }}>
                  Unified Revenue Operations Platform. The Future of Sales Technology for B2B SaaS Companies
                </Typography>
              </ContentHeader>

              <ContentContainer marginTop={9}>
                <WhiteLogo />
                <Typography
                  variant="p12"
                  component="p"
                  sx={{ color: 'primary.subtone2', width: '254px', textAlign: 'center', marginTop: '12px' }}
                >
                  The #1 RevOps CRM.
                </Typography>
              </ContentContainer>
            </ContentContainer>
          </Grid>
        )}
      </GridContainer>
    </Container>
  );
};

export default AuthLayout;
