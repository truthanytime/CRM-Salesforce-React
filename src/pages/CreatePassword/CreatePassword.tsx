import { FC, useState, useEffect, Dispatch, SetStateAction, MouseEvent } from 'react';
import { Typography, Box, InputLabel, FormHelperText } from '@mui/material';
import debounce from 'lodash.debounce';
import { useNavigate, useParams } from 'react-router-dom';

import { PUBLIC_ABS_ROUTE_PATHS } from 'core/constants';
import { Form, LoadingButton } from 'components/ui';
import { AuthLayout } from 'components/AuthLayout';
import { ValidationRule } from './components';
import { useAuth } from 'store/auth/hooks';
import { PasswordInput } from 'components/PasswordInput';

interface ValidPassword {
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  numberSymbolSpace: boolean;
}

const validatePassword = (password: string, setValid: Dispatch<SetStateAction<ValidPassword>>) => {
  setValid({
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numberSymbolSpace: /[^a-zA-Z0-9]|\s|\d/.test(password),
  });
};

const debouncedValidatePassword = debounce(validatePassword, 350);

const CreatePassword: FC = () => {
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState<ValidPassword>({
    length: false,
    lowercase: false,
    uppercase: false,
    numberSymbolSpace: false,
  });
  const { loading, error, session, setNewPassword, confirmPasswordReset } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();

  useEffect(() => {
    if (!session && !token) navigate(PUBLIC_ABS_ROUTE_PATHS.login, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debouncedValidatePassword(password, setValid);
  }, [password]);

  const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!password) return;
    if (token) confirmPasswordReset({ token, password });
    else setNewPassword(password);
  };

  const buttonEnabled = valid.length && valid.lowercase && valid.uppercase && valid.numberSymbolSpace;

  return (
    <AuthLayout backButtonEnabled currentStep={2} totalSteps={4}>
      <Box>
        <Typography variant="h2" marginBottom={4}>
          Create new password!
        </Typography>

        <Form noValidate>
          <InputLabel htmlFor="password">New password</InputLabel>

          <PasswordInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value as string)}
            placeholder="Enter a password"
          />

          <Box marginTop={3}>
            <ValidationRule label="At least 8 characters long" checked={valid.length} />
            <ValidationRule label="One lowercase character" checked={valid.lowercase} />
            <ValidationRule label="One uppercase character" checked={valid.uppercase} />
            <ValidationRule label="One number, symbol, or whitespace character" checked={valid.numberSymbolSpace} />
          </Box>

          <LoadingButton
            onClick={onSubmit}
            disabled={!buttonEnabled}
            sx={{ marginTop: 4 }}
            loading={loading}
            type="submit"
          >
            Save new password
          </LoadingButton>

          {!!error && (
            <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
              {typeof error === 'string' ? error : 'Something went wrong!'}
            </FormHelperText>
          )}
        </Form>
      </Box>
    </AuthLayout>
  );
};

export default CreatePassword;
