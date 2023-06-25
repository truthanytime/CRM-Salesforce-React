import { FC, useContext, useMemo, useState, useEffect } from 'react';
import { ProductsMain } from './ui';
import { Typography, IconButton } from '@mui/material';
import { TextButton, LoadingButton } from 'components/ui';
import { ReactComponent as ArrowLeft } from 'assets/icons/navBack.svg';
import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import { ButtonGroup, ModalFooter, BackTo, ModalContainer, ModalHeader } from '../../ui';
import { Pipeline, PipelineFormContext, PipelineFormSteps, usePipelines } from 'pages/HyperFunnel/PipelinesProvider';
import { useFormikContext } from 'formik';
import { CustomMultiDropdown } from 'components/CustomDropdown';
import { OptionValue } from 'core/types';
import update from 'immutability-helper';
import { Product } from 'providers/ProductsProvider';
import { useProducts } from 'providers/ProductsProvider';

const TeamUsersPage: FC = () => {
  const { products } = useProducts();

  const { onClose, setStep } = useContext(PipelineFormContext);
  const [selectedProducts, setSelectedProducts] = useState<OptionValue<Product>[]>([]);

  const { values, touched, errors, setValues, handleBlur } = useFormikContext<Pipeline>();

  const { setEditPipeline } = usePipelines();

  const closeModal = () => {
    setEditPipeline(null);
    onClose();
  };

  useEffect(() => {
    setSelectedProducts(
      values.pipelineProducts.map((product) => {
        return { label: product.productName, value: product };
      }),
    );
  }, [values]);

  const Suggestions = useMemo(() => {
    return products.reduce((acc, val) => {
      acc.push({ label: val.productName, value: val });
      return acc;
    }, [] as OptionValue<Product>[]);
  }, [products]);

  const handleSave = () => {
    setValues(update(values, { $merge: { pipelineProducts: selectedProducts.map((s) => s.value) } }));
    setStep(PipelineFormSteps.SECOND);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <Typography variant="h3" sx={{ color: 'neutral.main' }}>
          Products
        </Typography>

        <IconButton onClick={closeModal}>
          <CrossIcon />
        </IconButton>
      </ModalHeader>

      <ProductsMain sx={{ height: 496 }}>
        <CustomMultiDropdown<Product>
          id="products"
          placeholder="Choose Products"
          value={selectedProducts}
          options={Suggestions}
          onSelect={(value) => setSelectedProducts(value)}
          InputProps={{
            error: touched.pipelineProducts && !!errors.pipelineProducts,
            onBlur: handleBlur,
          }}
        />
      </ProductsMain>

      <ModalFooter>
        <BackTo onClick={() => setStep(PipelineFormSteps.SECOND)}>
          <ArrowLeft />
          <Typography variant="p12">Back to Pipeline creating</Typography>
        </BackTo>

        <ButtonGroup>
          <TextButton sx={{ marginRight: 3 }} onClick={closeModal}>
            Cancel
          </TextButton>
          <LoadingButton variant="contained" onClick={handleSave}>
            {'Save and back to Pipeline'}
          </LoadingButton>
        </ButtonGroup>
      </ModalFooter>
    </ModalContainer>
  );
};

export default TeamUsersPage;
