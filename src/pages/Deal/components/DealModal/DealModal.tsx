import { FC, useState, useRef } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

import { createDeal as createDealApi, updateDeal as updateDealApi } from 'http/deal';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalFooter, ModalHeader, ModalMain, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { Paper } from './ui';
import { CustomDropdown } from 'components/CustomDropdown';
import { Deal } from 'store/deal/types';
import { generatePath, useNavigate } from 'react-router-dom';
import { PRIVATE_ABS_ROUTE_PATHS } from 'core/constants';

interface FormValues {
  dealName: string;
  // dealAccountName: string;
}

const validationSchema = yup.object({
  dealName: yup.string().required('Required').min(2, 'Invalid Last Name'),
});

interface DealModalProps {
  open: boolean;
  toggleOpen: () => void;
  deal?: Deal;
}

const DealModal: FC<DealModalProps> = ({ open, deal, toggleOpen }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Deal> = {
        ...values,
      };

      let dealRes: Deal;

      if (deal) dealRes = await updateDealApi(deal.dealId, data);
      else dealRes = await createDealApi(data);

      navigate(generatePath(PRIVATE_ABS_ROUTE_PATHS.dealScapeDetail, { id: String(dealRes.dealId) }));

      closeModal();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    dealName: deal?.dealName ?? '',
    // dealAccountName: deal?.dealAccountName ?? '',
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {deal ? 'Update Deal' : 'New Deal'}
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
                  <CustomInput
                    id="dealName"
                    name="dealName"
                    label="Deal name"
                    placeholder="Type the deal name"
                    fullWidth
                    value={values.dealName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dealName && !!errors.dealName}
                  />

                  {/* <CustomDropdown<string>
                    id="dealAccountName"
                    label="Account Type"
                    placeholder="Select the Account type"
                    value={values.dealAccountName}
                    options={[]}
                    onSelect={(value) => setFieldValue('dealAccountName', value)}
                    InputProps={{
                      error: touched.dealAccountName && !!errors.dealAccountName,
                      onBlur: handleBlur,
                    }}
                    PaperComponent={Paper}
                  /> */}
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
                  {deal ? 'Update the deal' : 'Add the deal'}
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default DealModal;
