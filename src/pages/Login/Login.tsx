import { FC, ChangeEvent, useEffect } from 'react';
import { FormHelperText, Typography, Box, InputLabel, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

import { PUBLIC_ABS_ROUTE_PATHS } from 'core/constants';
import { ReactComponent as GoogleSmallIcon } from 'assets/icons/googleSmall.svg';
import { ReactComponent as GoogleWhiteSmallIcon } from 'assets/icons/googleWhiteSmall.svg';
import { Form, AuthInput, LoadingButton, SecondaryLoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';
import { AuthLayout } from 'components/AuthLayout';
import { CustomLink } from 'components/CustomLink';
import { CustomCheckbox } from 'components/CustomCheckbox';
import { noop, validatePassword } from 'core/utils';
import { usePrevious } from 'hooks';
import { PasswordInput } from 'components/PasswordInput';

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const formSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email.'),
  password: yup
    .string()
    .required('Password is required')
    .test(
      'isValidPassword',
      'Password must be at least 8 characters long, include at least one lowercase and one uppercase character, and one number, symbol, or whitespace character.',
      validatePassword,
    ),
  rememberMe: yup.boolean(),
});

const Login: FC = () => {
  const [searchParams] = useSearchParams();
  const { loading, error, session, login, setError, setSuccess } = useAuth();
  const prevSession = usePrevious<string | null>(session);
  const navigate = useNavigate();
  const theme = useTheme();
  const smallDevice = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    return () => {
      setError(false);
      setSuccess(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (prevSession !== session && session) navigate(PUBLIC_ABS_ROUTE_PATHS.createPassword);
  // }, [session, prevSession, navigate]);

  const initialValues: FormValues = {
    email: searchParams.get('email') ?? '',
    password: '',
    rememberMe: false,
  };

  const onSubmit = (values: FormValues) => {
    login(values);
  };

  return (
    <AuthLayout>
      <Box>
        <Typography variant="h2" marginBottom={4}>
          Welcome Back!
        </Typography>

        <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit}>
          {({ values, isValid, dirty, handleChange, setFieldValue, handleSubmit, handleBlur }) => (
            <Form noValidate>
              <Box>
                <InputLabel htmlFor="email">Email address</InputLabel>

                <AuthInput
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Box>

              <Box marginTop="24px" marginBottom="4px">
                <InputLabel htmlFor="password">Password</InputLabel>

                <PasswordInput
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Box>

              <CustomLink to={PUBLIC_ABS_ROUTE_PATHS.resetPassword}>Forgot my password</CustomLink>

              <CustomCheckbox
                label="Remember me"
                containerSyle={{ marginTop: 26 }}
                checked={values.rememberMe}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setFieldValue('rememberMe', event.target.checked)}
              />

              <LoadingButton
                loading={loading}
                disabled={!(isValid && dirty)}
                sx={{ marginTop: 4 }}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                Log in
              </LoadingButton>

              {!!error && (
                <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
                  {typeof error === 'string' ? error : 'Something went wrong!'}
                </FormHelperText>
              )}

              <Box marginTop="32px">
                <Divider>or</Divider>
              </Box>

              <SecondaryLoadingButton
                onClick={noop}
                variant="outlined"
                sx={{ marginTop: 3 }}
                startIcon={smallDevice ? <GoogleWhiteSmallIcon /> : <GoogleSmallIcon className="custom-color" />}
              >
                Sign in with Google
              </SecondaryLoadingButton>
            </Form>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  );
};

export default Login;
