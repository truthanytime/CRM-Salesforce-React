import { FC, MouseEvent } from 'react';
import { Typography, Box, InputLabel } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthFormContainer, Form, LoadingButton } from 'components/ui';
import { AuthLayout } from 'components/AuthLayout';
import { CustomInput } from 'components/CustomInput';
import { WORKERS_NUMBER_OPTIONS, WEBSITE_REGEX, DOMAIN_REGEX } from 'core/constants';
import { ToggleButtonGroup, ToggleButton } from './ui';

interface FormValues {
  workersNumber: string;
  companyWebsite: string;
  customerCityDomain: string;
}

const initialValues: FormValues = {
  workersNumber: '',
  companyWebsite: '',
  customerCityDomain: '',
};

const validationSchema = yup.object({
  workersNumber: yup.string().required('Required'),
  companyWebsite: yup.string().required('Required').matches(WEBSITE_REGEX, 'Invalid website'),
  customerCityDomain: yup.string().required('Required').matches(DOMAIN_REGEX, 'Invalid domain'),
});

const CompleteProfileTwo: FC = () => {
  const onSubmit = (values: FormValues) => {
    console.log({ values });
  };

  return (
    <AuthLayout backButtonEnabled currentStep={4} totalSteps={4}>
      <Box>
        <Typography variant="h2" marginBottom={2}>
          Complete Your Profile!
        </Typography>

        <Typography variant="p12" sx={{ color: 'neutral.n400' }} component="p">
          For the purpose of industry regulation, your details are required.
        </Typography>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ values, isValid, dirty, handleChange, setFieldValue, handleBlur, handleSubmit }) => (
            <AuthFormContainer marginTop={4}>
              <Form noValidate>
                <Box>
                  <InputLabel sx={{ color: 'neutral.main', marginBottom: 2 }}>
                    How many people work at your company?
                  </InputLabel>

                  <ToggleButtonGroup
                    value={values.workersNumber}
                    exclusive
                    onChange={(event: MouseEvent<HTMLElement>, workersNumber: string) =>
                      setFieldValue('workersNumber', workersNumber)
                    }
                  >
                    {WORKERS_NUMBER_OPTIONS.map((option) => (
                      <ToggleButton key={option.value} value={option.value}>
                        {option.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>

                <CustomInput
                  id="companyWebsite"
                  name="companyWebsite"
                  label="Your company's website"
                  fullWidth
                  value={values.companyWebsite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelSx={{ color: 'neutral.main', marginTop: 3 }}
                />

                <CustomInput
                  id="customerCityDomain"
                  name="customerCityDomain"
                  label="Suggested CustomerCity’s domain"
                  fullWidth
                  value={values.customerCityDomain}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelSx={{ color: 'neutral.main', marginTop: 3 }}
                />

                <LoadingButton
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                  disabled={!(isValid && dirty)}
                  sx={{ marginTop: 4 }}
                  type="submit"
                >
                  Next
                </LoadingButton>
              </Form>
            </AuthFormContainer>
          )}
        </Formik>
      </Box>
    </AuthLayout>
  );
};

export default CompleteProfileTwo;
