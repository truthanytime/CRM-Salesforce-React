import { FC, useState, useRef } from 'react';
import { Typography, Divider, IconButton, Grid, Box, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createContact as createContactApi, updateContact as updateContactApi } from 'http/contact';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ReactComponent as NavBackIcon } from 'assets/icons/navBack.svg';
import {
  Modal,
  ModalContainer,
  ModalHeader,
  ModalMain,
  TextButton,
  PaginatedModalFooter,
  GridItem,
  AddressBox,
} from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { Contact } from 'store/contact/types';
import { useNavigate, generatePath } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';
import { CustomDropdown } from 'components/CustomDropdown';
import { ContactInformation, defaultContactInfo } from 'store/types';

interface FormValues {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  // contactAssociate: string;
  // contactRole: string;
  // contactStage: string;
  // contactType: string;
  contactInfo: ContactInformation;
}

const validationSchema = yup.object({
  firstName: yup.string().required('Required').min(2, 'Invalid Last Name'),
  lastName: yup.string().required('Required').min(2, 'Invalid Last Name'),
});

interface ContactModalProps {
  open: boolean;
  toggleOpen: () => void;
  contact?: Contact;
}

const ContactModal: FC<ContactModalProps> = ({ open, contact, toggleOpen }) => {
  const navigate = useNavigate();
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Contact> = {
        ...values,
      };

      let contactRes: Contact;

      if (contact) contactRes = await updateContactApi(contact.contactId, data);
      else contactRes = await createContactApi(data);

      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.contactDetail, { id: String(contactRes.contactId) }));

      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    firstName: contact?.firstName ?? '',
    middleName: contact?.middleName ?? '',
    lastName: contact?.lastName ?? '',
    title: contact?.title ?? '',
    // contactAssociate: contact?.contactAssociate ?? '',
    // contactRole: contact?.contactRole ?? '',
    // contactStage: contact?.contactStage ?? '',
    // contactType: contact?.contactType ?? '',
    contactInfo: contact?.contactInfo ?? defaultContactInfo,
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {contact ? 'Update Contact' : 'New Contact'}
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
                  {isFirst ? (
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="firstName"
                          name="firstName"
                          label="First name *"
                          placeholder="Enter the First name"
                          fullWidth
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && !!errors.firstName}
                        />

                        <CustomInput
                          id="middleName"
                          name="middleName"
                          label="Middle name"
                          placeholder="Enter the Middle name"
                          fullWidth
                          value={values.middleName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.middleName && !!errors.middleName}
                        />

                        <CustomInput
                          id="lastName"
                          name="lastName"
                          label="Last name *"
                          placeholder="Enter the Last name"
                          fullWidth
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && !!errors.lastName}
                        />

                        <CustomInput
                          id="contact-title"
                          name="title"
                          label="Title"
                          placeholder="Enter the title"
                          fullWidth
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.title && !!errors.title}
                        />
                      </GridItem>

                      <GridItem item xs={6}>
                        {/* <CustomInput
                          id="contactRole"
                          name="contactRole"
                          label="Role"
                          placeholder="Enter Role"
                          fullWidth
                          value={values.contactRole}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactRole && !!errors.contactRole}
                        /> */}
                        <CustomInput
                          id="email"
                          name="contactInfo.email"
                          label="Primary Email"
                          placeholder="Enter the Primary Email"
                          fullWidth
                          value={values.contactInfo.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.email && !!errors.contactInfo?.email}
                        />

                        {/* <CustomInput
                          id="contactSecondaryEmail"
                          name="contactSecondaryEmail"
                          label="Secondary Email"
                          placeholder="Enter the Secondary Email"
                          fullWidth
                          value={values.contactSecondaryEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactSecondaryEmail && !!errors.contactSecondaryEmail}
                        /> */}

                        <CustomInput
                          id="phoneNumber"
                          name="contactInfo.phoneNumber"
                          label="Phone number"
                          placeholder="Enter the Phone number"
                          fullWidth
                          value={values.contactInfo.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.phoneNumber && !!errors.contactInfo?.phoneNumber}
                        />
                      </GridItem>
                    </Grid>
                  ) : (
                    <Grid container spacing={3}>
                      <GridItem item xs={6}>
                        <CustomInput
                          id="mobileNumber"
                          name="contactInfo.mobileNumber"
                          label="Mobile number"
                          placeholder="Enter the Mobile number"
                          fullWidth
                          value={values.contactInfo.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.contactInfo?.mobileNumber && !!errors.contactInfo?.mobileNumber}
                        />

                        {/* <CustomDropdown<string>
                          id="contact-associates"
                          label="Associated Account"
                          placeholder="Select Associated Account"
                          value={values.contactAssociate}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactAssociate', value)}
                          InputProps={{
                            error: touched.contactStage && !!errors.contactStage,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        /> */}

                        {/* <CustomDropdown<string>
                          id="contactStage"
                          label="Contact Stage"
                          placeholder="Select the Contact stage"
                          value={values.contactStage}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactStage', value)}
                          InputProps={{
                            error: touched.contactStage && !!errors.contactStage,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        /> */}

                        {/* <CustomDropdown<string>
                          id="contactType"
                          label="Contact Type"
                          placeholder="Select the Contact type"
                          value={values.contactType}
                          options={[]}
                          onSelect={(value) => setFieldValue('contactType', value)}
                          InputProps={{
                            error: touched.contactType && !!errors.contactType,
                            onBlur: handleBlur,
                          }}
                          PaperComponent={Paper}
                        /> */}
                      </GridItem>

                      <Grid item xs={6}>
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
                      </Grid>
                    </Grid>
                  )}
                </ModalMain>
              </form>

              <Divider />

              <PaginatedModalFooter>
                <Box sx={{ width: 250 }}>
                  {!isFirst && (
                    <TextButton onClick={() => setIsFirst(true)} sx={{ fontWeight: 400 }}>
                      <NavBackIcon style={{ marginRight: 10 }} />
                      Back to Step 1
                    </TextButton>
                  )}
                </Box>
                <span>
                  <strong>{isFirst ? '1' : '2'}</strong> / 2
                </span>
                <Box sx={{ width: 250, display: 'flex', flexDirection: 'row-reverse' }}>
                  {isFirst ? (
                    <LoadingButton variant="contained" onClick={() => setIsFirst(false)}>
                      Next
                    </LoadingButton>
                  ) : (
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
                      {contact ? 'Update the contact' : 'Add the contact'}
                    </LoadingButton>
                  )}
                  <TextButton sx={{ marginRight: 3 }} onClick={toggleOpen}>
                    Cancel
                  </TextButton>
                </Box>
              </PaginatedModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default ContactModal;
