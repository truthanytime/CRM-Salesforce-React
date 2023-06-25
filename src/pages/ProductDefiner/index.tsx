import { useState, useMemo } from 'react';
import { Typography, Grid, Box } from '@mui/material';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { SearchDropdown } from 'components/SearchDropdown';
import { PrimaryButton, SecondaryButton } from 'components/ui';
import ProductsProvider, { Product } from 'providers/ProductsProvider';
import { Loader } from 'components/Loader';
import { OptionValue } from 'core/types';
import { useAuth } from 'store/auth/hooks';
import { Container, ProductsSection, ProducsContainer, CounterContainer, SectionTitleContainer } from './ui';
import { ProductModal } from './components';
import { ProductsTable } from './components/ProductsTable';
import { useProducts } from 'providers/ProductsProvider';

export function ProductDefiner() {
  return (
    <ProductsProvider>
      <ProductDefinerContent />
    </ProductsProvider>
  );
}

export function ProductDefinerContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const { loading, products } = useProducts();
  const { isAdmin, isSuperAdmin } = useAuth();

  const toggleModal = () => {
    if (modalOpen && selectedProduct) setSelectedProduct(undefined);
    setModalOpen((prevState) => !prevState);
  };

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const regex = new RegExp(searchTerm, 'i');
    return products.reduce((acc, val) => {
      const productName = val.productName;
      if (productName.match(regex)) acc.push({ label: productName, value: productName });
      return acc;
    }, [] as OptionValue<string>[]);
  }, [products, searchTerm]);

  const data = useMemo(() => {
    if (!filterValue) return products;
    return products.filter((product) => product.productName === filterValue);
  }, [products, filterValue]);

  return (
    <Container>
      <Grid container spacing={2} sx={{ backgroundColor: 'neutral.white', padding: '24px 32px 16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" sx={{ color: 'neutral.main' }}>
            Product Definer
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" marginTop={2.5}>
            <Box width="250px" marginRight={2}>
              <SearchDropdown
                id="search-products"
                placeholder="Search all products..."
                options={suggestions}
                onSelect={(term) => setFilterValue(term)}
                onChange={(term) => setSearchTerm(term)}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
          <SecondaryButton>Import</SecondaryButton>

          <PrimaryButton startIcon={<PlusIcon />} sx={{ marginLeft: 2 }} onClick={toggleModal}>
            Add product
          </PrimaryButton>
        </Grid>
      </Grid>

      <ProductsSection>
        {products.length > 0 ? (
          <ProductsTable
            products={data}
            setSelectedProduct={(product) => {
              setSelectedProduct(product);
              toggleModal();
            }}
          />
        ) : (
          <>
            <SectionTitleContainer>
              <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.main' }}>
                PRODUCTS
              </Typography>

              <CounterContainer>
                <Typography variant="labelRegular12" sx={{ color: 'neutral.main' }}>
                  0
                </Typography>
              </CounterContainer>
            </SectionTitleContainer>

            <ProducsContainer marginTop={1}>
              {(isAdmin || isSuperAdmin) && (
                <>
                  {' '}
                  <Typography variant="labelRegular12" component="p" sx={{ color: 'neutral.n400' }}>
                    You have not added any products yet
                  </Typography>
                  <PrimaryButton startIcon={<PlusIcon />} sx={{ marginTop: 3 }} onClick={toggleModal}>
                    Add new product
                  </PrimaryButton>{' '}
                </>
              )}
            </ProducsContainer>
          </>
        )}
      </ProductsSection>

      <ProductModal open={modalOpen} toggleOpen={toggleModal} product={selectedProduct} />

      {loading && <Loader />}
    </Container>
  );
}
