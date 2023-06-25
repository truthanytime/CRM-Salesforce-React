import { FC, useState, ChangeEvent, useEffect, MouseEvent, useRef } from 'react';
import { Container, Grid, FormHelperText, InputLabel, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import omitBy from 'lodash.omitby';

import * as yup from 'yup';

import { AddressBox, Form, GridItem, Input, LoadingButton } from 'components/ui';
import { useTenant } from 'store/tenant/hooks';
import { Tenant } from 'store/tenant/types';
import { CustomInput } from 'components/CustomInput';
import { Formik, FormikProps } from 'formik';
import { ContactInformation, defaultContactInfo } from 'store/types';

interface FormValues {
  tenantName: string;
  contactInfo: ContactInformation;
  billingContactInfo: ContactInformation;
  ownerName: string;
  ownerEmail: string;
}

const validationSchema = yup.object({
  tenantName: yup.string().required('Required').min(2, 'Invalid Last Name'),
  ownerEmail: yup.string().required('Required').min(2, 'Invalid Last Name'),
});

const CreateTenant: FC = () => {
  const location = useLocation();
  const state = location.state as Tenant | null;
  const formRef = useRef<FormikProps<FormValues> | null>(null);
  const { loading, error, success, createTenant, updateTenant } = useTenant();

  const initialValues: FormValues = {
    tenantName: state?.tenantName ?? '',
    contactInfo: state?.contactInfo ?? defaultContactInfo,
    billingContactInfo: state?.billingContactInfo ?? defaultContactInfo,
    ownerName: state?.ownerName ?? '',
    ownerEmail: state?.ownerEmail ?? '',
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const data: Partial<Tenant> = {
        ...values,
      };

      if (state) updateTenant({ tenantId: state.tenantId, data });
      else createTenant(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {({ values, touched, errors, isValid, dirty, handleChange, handleBlur, handleSubmit }) => (
          <>
            <form noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 4 }}>
                <Input
                  id="tenantName"
                  name="tenantName"
                  type="text"
                  label="Tenant Name*"
                  variant="standard"
                  value={values.tenantName}
                  onChange={handleChange}
                  fullWidth
                  onBlur={handleBlur}
                  error={touched?.tenantName && !!errors?.tenantName}
                />

                <Input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  label="Account Owner*"
                  variant="standard"
                  value={values.ownerName}
                  onChange={handleChange}
                  fullWidth
                />

                <Input
                  id="ownerEmail"
                  name="ownerEmail"
                  type="email"
                  label="E-mail address*"
                  variant="standard"
                  value={values.ownerEmail}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
              <Grid container spacing={2} style={{ marginTop: 10 }}>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ mb: 0.5 }}>Physical Address</InputLabel>
                  <AddressBox>
                    <CustomInput
                      id="street"
                      name="contactInfo.street"
                      label="Street"
                      placeholder="Type the Street"
                      fullWidth
                      value={values.contactInfo.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.contactInfo?.street && !!errors.contactInfo?.street}
                    />
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="city"
                          name="contactInfo.city"
                          label="City"
                          placeholder="Type the City"
                          fullWidth
                          value={values.contactInfo.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.city && !!errors.contactInfo?.city}
                        />
                        <CustomInput
                          id="zip"
                          name="contactInfo.zip"
                          label="Zip code"
                          placeholder="Type the Zip code"
                          fullWidth
                          value={values.contactInfo.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.zip && !!errors.contactInfo?.zip}
                        />
                      </GridItem>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="addressState"
                          name="contactInfo.addressState"
                          label="State/Province"
                          placeholder="Type the State/Province"
                          fullWidth
                          value={values.contactInfo.addressState}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.addressState && !!errors.contactInfo?.addressState}
                        />
                        <CustomInput
                          id="country"
                          name="contactInfo.country"
                          label="Country"
                          placeholder="Type the Country"
                          fullWidth
                          value={values.contactInfo.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.country && !!errors.contactInfo?.country}
                        />
                      </GridItem>
                    </Grid>
                  </AddressBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel sx={{ mb: 0.5 }}>Billing Address</InputLabel>
                  <AddressBox>
                    <CustomInput
                      id="billingContactInfo.street"
                      name="billingContactInfo.street"
                      label="Street"
                      placeholder="Type the Street"
                      fullWidth
                      value={values.billingContactInfo.street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.billingContactInfo?.street && !!errors.billingContactInfo?.street}
                    />
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="billingContactInfo.city"
                          name="billingContactInfo.city"
                          label="City"
                          placeholder="Type the City"
                          fullWidth
                          value={values.billingContactInfo.city}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.billingContactInfo?.city && !!errors.billingContactInfo?.city}
                        />
                        <CustomInput
                          id="billingContactInfo.zip"
                          name="billingContactInfo.zip"
                          label="Zip code"
                          placeholder="Type the Zip code"
                          fullWidth
                          value={values.billingContactInfo.zip}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.billingContactInfo?.zip && !!errors.billingContactInfo?.zip}
                        />
                      </GridItem>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="billingContactInfo.addressState"
                          name="billingContactInfo.addressState"
                          label="State/Province"
                          placeholder="Type the State/Province"
                          fullWidth
                          value={values.billingContactInfo.addressState}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.billingContactInfo?.addressState && !!errors.billingContactInfo?.addressState}
                        />
                        <CustomInput
                          id="billingContactInfo.country"
                          name="billingContactInfo.country"
                          label="Country"
                          placeholder="Type the Country"
                          fullWidth
                          value={values.billingContactInfo.country}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.billingContactInfo?.country && !!errors.billingContactInfo?.country}
                        />
                      </GridItem>
                    </Grid>
                  </AddressBox>
                </Grid>
              </Grid>
              <LoadingButton
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit();
                }}
                loading={loading}
                variant="outlined"
                type="submit"
                sx={{ marginTop: 4, alignSelf: 'flex-end' }}
              >
                {state ? 'Update tenant' : 'Add & Send e-mail'}
              </LoadingButton>

              {error && (
                <FormHelperText error>{typeof error === 'string' ? error : 'Something went wrong!'}</FormHelperText>
              )}

              {success && (
                <FormHelperText variant="filled" style={{ color: 'green' }}>
                  {typeof success === 'string' ? success : 'Operation successfully done!'}
                </FormHelperText>
              )}
            </form>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default CreateTenant;
