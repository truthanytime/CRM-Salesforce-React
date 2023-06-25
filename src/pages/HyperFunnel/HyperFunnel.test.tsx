import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from 'test/server';
import { getApiPath } from 'test/server-handlers';
import { render, screen, within, waitFor } from 'test/test-utils';
import { initialRootState } from 'store/reducers';
import { UserType } from 'core/types';
import { productsData } from 'test/data';
import { mapProductCategoryToLabel, mapProductRateChargeTypeToLabel, mapProductCurrencyToLabel } from 'core/utils';
import { ProductCategory, ProductRateChargeType, ProductCurrency } from 'providers/ProductsProvider';
import HyperFunnel from './HyperFunnel';

const initialState = { ...initialRootState, auth: { ...initialRootState.auth, role: UserType.ADMIN } };

test('renders product definer with no products', async () => {
  server.use(
    rest.get(getApiPath('product'), async (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          data: [],
          message: 'Products fetched successfully!',
          success: true,
        }),
      ),
    ),
  );

  render(<HyperFunnel />, { initialState });

  expect(screen.getByRole('heading', { name: /product definer/i })).toBeInTheDocument();
  expect(screen.getByTestId('search-products')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument();
  expect(screen.getByText(/you have not added any products yet/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add new product/i })).toBeInTheDocument();
});

test('clicking on "Add product" button opens new product modal', async () => {
  server.use(
    rest.get(getApiPath('product'), async (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          data: [],
          message: 'Products fetched successfully!',
          success: true,
        }),
      ),
    ),
  );

  render(<HyperFunnel />, { initialState });

  userEvent.click(screen.getByRole('button', { name: /add new product/i }));

  const presentation = screen.getByRole('presentation');

  expect(within(presentation).getByRole('heading', { name: /new product/i })).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/product name/i)).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/description \(optional\)/i)).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/category/i)).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/rate charge type/i)).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/standard prices\/fees/i)).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/currency/i)).toBeInTheDocument();
  expect(within(presentation).getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  expect(within(presentation).getByRole('button', { name: /add the product/i })).toBeInTheDocument();
  expect(within(presentation).getByRole('button', { name: /add the product/i })).toBeDisabled();
});

test('renders page with products table', async () => {
  render(<HyperFunnel />, { initialState });

  expect(await screen.findByTestId('products-table')).toBeInTheDocument();

  expect(screen.queryByText(/you have not added any products yet/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /add new product/i })).not.toBeInTheDocument();

  await waitFor(() => {
    productsData.forEach((product) => {
      expect(screen.getByRole('cell', { name: product.productName })).toBeInTheDocument();
    });
  });
});

test('clicking on product row/cell opens update product modal', async () => {
  render(<HyperFunnel />, { initialState });

  expect(await screen.findByTestId('products-table')).toBeInTheDocument();

  const product = productsData[0];

  userEvent.click(await screen.findByRole('cell', { name: product.productName }));

  const presentation = screen.getByRole('presentation');

  expect(within(presentation).getByRole('heading', { name: /update product/i })).toBeInTheDocument();
  expect(within(presentation).getByLabelText(/product name/i)).toHaveValue(product.productName);
  expect(within(presentation).getByLabelText(/description \(optional\)/i)).toHaveValue(product.productDescription);
  expect(within(presentation).getByLabelText(/category/i)).toHaveValue(
    mapProductCategoryToLabel(product.productCategory as ProductCategory),
  );
  expect(within(presentation).getByLabelText(/rate charge type/i)).toHaveValue(
    mapProductRateChargeTypeToLabel(product.productRateChargeType as ProductRateChargeType),
  );
  expect(within(presentation).getByLabelText(/standard prices\/fees/i)).toHaveValue(product.productPrice);
  expect(within(presentation).getByLabelText(/currency/i)).toHaveValue(
    mapProductCurrencyToLabel(product.productCurrency as ProductCurrency),
  );
  expect(within(presentation).getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  expect(within(presentation).getByRole('button', { name: /update the product/i })).toBeInTheDocument();
  expect(within(presentation).getByRole('button', { name: /update the product/i })).toBeDisabled();
});
