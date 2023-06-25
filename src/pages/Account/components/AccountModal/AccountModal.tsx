import { FC, useState, useRef, useEffect } from 'react';
import { Typography, Divider, IconButton, Grid, InputLabel, Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createAccount as createAccountApi, updateAccount as updateAccountApi } from 'http/account';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import {
  AddressBox,
  GridItem,
  Modal,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalMain,
  TextButton,
} from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { Account } from 'store/account/types';
import { CustomTextArea } from 'components/CustomTextarea';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { ContactInformation, defaultContactInfo } from 'store/types';
import { getAccountTypes as getAccountTypesApi } from 'http/account/accountType';
import { CustomDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';

interface FormValues {
  accountName: string;
  description: string;
  // industryId: number;
  revenuePerYear: number;
  accountTypeId: number;
  contactInfo: ContactInformation;
}

const validationSchema = yup.object({
  accountName: yup.string().required('Required').min(2, 'Invalid Last Name'),
  accountTypeId: yup.number().required('Required').moreThan(0),
});

interface AccountModalProps {
  open: boolean;
  toggleOpen: () => void;
  account?: Account;
}

const AccountModal: FC<AccountModalProps> = ({ open, account, toggleOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);
  const [accTypes, setAccTypes] = useState<OptionValue<number>[]>([]);

  useEffect(() => {
    getAccountTypesApi().then((res) => {
      setAccTypes(
        res.map((acc) => {
          return { label: acc.accountTypeName, value: acc.accountTypeId };
        }),
      );
    });
  }, []);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Account> = {
        ...values,
      };

      let accountRes: Account;

      if (account) accountRes = await updateAccountApi(account.accountId, data);
      else accountRes = await createAccountApi(data);

      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.accountDetail, { id: String(accountRes.accountId) }));

      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    accountName: account?.accountName ?? '',
    revenuePerYear: account?.revenuePerYear ?? 0,
    // industryId: account?.industryId ?? 0,
    description: account?.description ?? '',
    accountTypeId: account?.accountTypeId ?? 0,
    contactInfo: account?.contactInfo ?? defaultContactInfo,
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {account ? 'Update Account' : 'New Account'}
          </Typography>

          <IconButton onClick={toggleOpen}>
            <CrossIcon />
          </IconButton>
        </ModalHeader>

        <Divider />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          innerRef={formRef}
        >
          {({ values, touched, errors, isValid, dirty, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
            <>
              <form noValidate>
                <ModalMain>
                  <Grid container spacing={3}>
                    <GridItem item xs={6}>
                      <CustomInput
                        id="accountName"
                        name="accountName"
                        label="Account name"
                        placeholder="Type the account name"
                        fullWidth
                        value={values.accountName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.accountName && !!errors.accountName}
                      />
                      <CustomTextArea
                        id="description"
                        name="description"
                        label={
                          <Typography variant="labelRegular12">
                            Description{' '}
                            <Typography variant="labelRegular12" sx={{ color: 'neutral.n400' }}>
                              (optional)
                            </Typography>
                          </Typography>
                        }
                        placeholder="Add description to the account"
                        minRows={4}
                        maxRows={8}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />

                      <CustomDropdown<number>
                        id="accountTypeId"
                        label="Account Type"
                        placeholder="Select the Account type"
                        value={values.accountTypeId}
                        options={accTypes}
                        onSelect={(value) => setFieldValue('accountTypeId', value)}
                        InputProps={{
                          error: touched.accountTypeId && !!errors.accountTypeId,
                          onBlur: handleBlur,
                        }}
                        PaperComponent={Paper}
                      />

                      <CustomInput
                        id="accountRevenue"
                        name="revenuePerYear"
                        label="Company revenue"
                        type="number"
                        placeholder="Add company revenue"
                        fullWidth
                        value={values.revenuePerYear}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.revenuePerYear && !!errors.revenuePerYear}
                      />

                      {/* <CustomInput
                    id="industryId"
                    name="industryId"
                    type="number"
                    label="Company industry"
                    placeholder="Add company industry"
                    fullWidth
                    value={values.industryId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.industryId && !!errors.industryId}
                  /> */}
                    </GridItem>
                    <GridItem item xs={6}>
                      <InputLabel sx={{ mb: 1 }}>Address</InputLabel>
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
                    </GridItem>
                  </Grid>
                </ModalMain>
              </form>

              <Divider />

              <ModalFooter>
                <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                  Cancel
                </TextButton>

                <LoadingButton
                  variant="contained"
                  disabled={!(isValid && dirty)}
                  loading={loading}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }}
                  type="submit"
                >
                  {account ? 'Update the account' : 'Add the account'}
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default AccountModal;
