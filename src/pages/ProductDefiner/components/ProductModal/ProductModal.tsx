import { FC, useState, useRef } from 'react';
import { Grid, Typography, Divider, IconButton, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

// import { createProduct as createProductApi, updateProduct as updateProductApi } from 'http/product';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { Modal, ModalContainer, ModalHeader, ModalMain, ModalFooter, TextButton } from 'components/ui';
import { CustomInput } from 'components/CustomInput';
import { CustomDropdown } from 'components/CustomDropdown';
import { CustomTextArea } from 'components/CustomTextarea';
import {
  Product,
  ProductCategory,
  ProductCurrency,
  ProductRateChargeType,
  useProducts,
} from 'providers/ProductsProvider';
import { PRODUCT_RATE_CHARGE_TYPE_OPTIONS, PRODUCT_CATEGORY_OPTIONS, PRODUCT_CURRENCY_OPTIONS } from 'core/constants';
import { PriceCurrencyContainer, Paper } from './ui';

interface FormValues {
  productName: string;
  description: string;
  category: string;
  rateChargeType: string;
  price: string;
  currency: string;
}

const validationSchema = yup.object({
  productName: yup.string().required('Required').min(2, 'Invalid name'),
  description: yup.string(),
  category: yup.string().required('Required'),
  rateChargeType: yup.string().required('Required'),
  price: yup.string().required('Required'),
  currency: yup.string().required('Required'),
});

interface ProductModalProps {
  open: boolean;
  toggleOpen: () => void;
  product?: Product;
}

const ProductModal: FC<ProductModalProps> = ({ open, product, toggleOpen }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<FormikProps<FormValues> | null>(null);

  const { update, create } = useProducts();

  const closeModal = () => {
    formRef.current?.resetForm();
    toggleOpen();
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const data: Partial<Product> = {
        ...values,
        category: values.category as ProductCategory,
        rateChargeType: values.rateChargeType as ProductRateChargeType,
        price: parseFloat(values.price),
      };

      if (product) update(product.productId, data as Product);
      else create(data as Product);

      closeModal();
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  const initialValues: FormValues = {
    productName: product?.productName ?? '',
    description: product?.description ?? '',
    category: product?.category ?? '',
    rateChargeType: product?.rateChargeType ?? '',
    price: product?.price.toString() ?? '',
    currency: ProductCurrency.USD,
  };

  return (
    <Modal open={open} onClose={toggleOpen}>
      <ModalContainer>
        <ModalHeader>
          <Typography variant="h3" sx={{ color: 'neutral.main' }}>
            {product ? 'Update Product' : 'New Product'}
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
              <ModalMain>
                <form noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <CustomInput
                        id="productName"
                        name="productName"
                        label="Product name"
                        placeholder="Type the Product name"
                        fullWidth
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.productName && !!errors.productName}
                      />
                    </Grid>

                    <Grid item xs={12}>
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
                        placeholder="Add description to the product"
                        minRows={4}
                        maxRows={8}
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <CustomDropdown<string>
                        id="category"
                        label="Category"
                        placeholder="Not selected"
                        value={values.category}
                        options={PRODUCT_CATEGORY_OPTIONS}
                        onSelect={(value) => setFieldValue('category', value)}
                        InputProps={{
                          error: touched.category && !!errors.category,
                          onBlur: handleBlur,
                        }}
                        PaperComponent={Paper}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <CustomDropdown<string>
                        id="rateChargeType"
                        label="Rate Charge Type"
                        placeholder="Not selected"
                        value={values.rateChargeType}
                        options={PRODUCT_RATE_CHARGE_TYPE_OPTIONS}
                        onSelect={(value) => setFieldValue('rateChargeType', value)}
                        InputProps={{
                          error: touched.rateChargeType && !!errors.rateChargeType,
                          onBlur: handleBlur,
                        }}
                        PaperComponent={Paper}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <PriceCurrencyContainer>
                        <CustomInput
                          id="price"
                          name="price"
                          label="Standard Prices/Fees"
                          placeholder="Ex. 100"
                          type="number"
                          fullWidth
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.price && !!errors.price}
                        />

                        <CustomDropdown<string>
                          id="currency"
                          label="Currency"
                          placeholder="Not selected"
                          value={values.currency}
                          options={PRODUCT_CURRENCY_OPTIONS}
                          onSelect={(value) => setFieldValue('currency', value)}
                        />
                      </PriceCurrencyContainer>
                    </Grid>

                    <Grid item xs={12}>
                      {!!error && (
                        <FormHelperText sx={{ color: 'red.main', textAlign: 'center', marginTop: 2 }}>
                          {typeof error === 'string' ? error : 'Something went wrong!'}
                        </FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </ModalMain>

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
                  {product ? 'Update the product' : 'Add the product'}
                </LoadingButton>
              </ModalFooter>
            </>
          )}
        </Formik>
      </ModalContainer>
    </Modal>
  );
};

export default ProductModal;
