import { FC, useState, useEffect } from 'react';
import { Box, Typography, InputLabel, FormHelperText } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as GoogleWhiteSmallIcon } from 'assets/icons/googleWhiteSmall.svg';
import { AuthLayout } from 'components/AuthLayout';
import { Form, Input, LoadingButton } from 'components/ui';
import { useAuth } from 'store/auth/hooks';

interface FormValues {
  email: string;
}

const formSchema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email.'),
});

const ResetPassword: FC = () => {
  const [userEmail, setUserEmail] = useState('');
  const { loading, error, success, initPasswordReset, setSuccess, setError } = useAuth();

  useEffect(() => {
    return () => {
      setError(false);
      setSuccess(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues: FormValues = {
    email: userEmail,
  };

  const onSubmit = (values: FormValues) => {
    setUserEmail(values.email);
    initPasswordReset(values.email);
  };

  const renderContent = () => {
    if (success) {
      return (
        <Box>
          <Typography variant="h2" marginBottom={2}>
            Check your email
          </Typography>

          <Typography variant="p12" sx={{ color: 'neutral.n400', maxWidth: 400 }} component="p">
            We&apos;ve sent an email to{' '}
            <Typography variant="p12" sx={{ color: 'neutral.main' }}>
              {userEmail}
            </Typography>
            .
          </Typography>

          <Typography variant="p12" sx={{ color: 'neutral.n400', maxWidth: 400 }} component="p" marginTop={1}>
            Click the link in the email to confirm your address and reset the password.
          </Typography>

          <LoadingButton
            onClick={() => window.open(`mailto:${userEmail}`, '_blank', 'noopener')}
            sx={{ marginTop: 4 }}
            startIcon={<GoogleWhiteSmallIcon />}
            fullWidth
          >
            Go to Gmail
          </LoadingButton>

          <Typography variant="p12" sx={{ color: 'neutral.n400', maxWidth: 400 }} component="p" marginTop={4}>
            Didn&apos;t get the email?
          </Typography>

          <Typography
            variant="p12"
            sx={{ color: 'primary.main', maxWidth: 400, cursor: 'pointer' }}
            component="p"
            onClick={() => setSuccess(false)}
            marginTop={1}
          >
            Resend or edit your email address
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h2" marginBottom={2}>
          Reset your password
        </Typography>

        <Typography variant="p12" sx={{ color: 'neutral.n400', maxWidth: 400 }} component="p">
          Please enter the email address you&apos;d like your password reset information sent to.
        </Typography>

        <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={onSubmit} enableReinitialize>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Form noValidate>
              <Box marginTop={4}>
                <InputLabel htmlFor="email">Email address</InputLabel>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : ''}
                  onBlur={handleBlur}
                  fullWidth
                />
              </Box>

              <LoadingButton
                loading={loading}
                disabled={!values.email || !!errors.email}
                sx={{ marginTop: 4 }}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
              >
                Reset password
              </LoadingButton>

              {!!error && (
                <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
                  {typeof error === 'string' ? error : 'Something went wrong!'}
                </FormHelperText>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    );
  };

  return <AuthLayout backButtonEnabled>{renderContent()}</AuthLayout>;
};

export default ResetPassword;
