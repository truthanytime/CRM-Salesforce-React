import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import { ReactComponent as SearchIcon } from 'assets/icons/searchGray.svg';
import { AuthFormContainer, Form, LoadingButton } from 'components/ui';
import { AuthLayout } from 'components/AuthLayout';
import { CustomInput } from 'components/CustomInput';
import { CustomDropdown } from 'components/CustomDropdown';

interface FormValues {
  industry: string;
  jobRole: string;
  companyName: string;
}

const initialValues: FormValues = {
  industry: '',
  jobRole: '',
  companyName: '',
};

const validationSchema = yup.object({
  industry: yup.string().required('Required'),
  jobRole: yup.string().required('Required'),
  companyName: yup.string().required('Required'),
});

const CompleteProfileOne: FC = () => {
  const onSubmit = (values: FormValues) => {
    console.log({ values });
  };

  return (
    <AuthLayout backButtonEnabled currentStep={3} totalSteps={4}>
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
                <CustomDropdown<string>
                  id="industry"
                  label="What industry are you in?"
                  placeholder="Industry"
                  value={values.industry}
                  options={[
                    {
                      label: 'Computer Software',
                      value: 'Computer Software',
                    },
                  ]}
                  onSelect={(value) => setFieldValue('industry', value)}
                  labelSx={{ color: 'neutral.main' }}
                  withPopupIcon={false}
                  InputProps={{
                    startAdornment: (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginLeft="6px"
                        marginRight="3px"
                      >
                        <SearchIcon />
                      </Box>
                    ),
                  }}
                />

                <CustomDropdown<string>
                  id="jobRole"
                  label="What is your job role?"
                  placeholder="Job role"
                  value={values.jobRole}
                  options={[
                    {
                      label: 'Chief Executive Officer (CEO)',
                      value: 'Chief Executive Officer (CEO)',
                    },
                  ]}
                  onSelect={(value) => setFieldValue('jobRole', value)}
                  labelSx={{ color: 'neutral.main', marginTop: 2 }}
                  withPopupIcon={false}
                  InputProps={{
                    startAdornment: (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginLeft="6px"
                        marginRight="3px"
                      >
                        <SearchIcon />
                      </Box>
                    ),
                  }}
                />

                <CustomInput
                  id="companyName"
                  name="companyName"
                  label="What is your company's name?"
                  fullWidth
                  value={values.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  labelSx={{ color: 'neutral.main', marginTop: 2 }}
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

export default CompleteProfileOne;
