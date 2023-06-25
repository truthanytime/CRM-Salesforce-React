import PipelinesProvider from './PipelinesProvider';
import PipelinesList from 'pages/HyperFunnel/components/PipelinesList';
import EmptyHyperFunnel from 'pages/HyperFunnel/EmptyHyperFunnel';
import ProductsProvider from 'providers/ProductsProvider';
import TenantUsersProvider from 'providers/TenantUsersProvider';

export default function HyperFunnel() {
  return (
    <TenantUsersProvider>
      <ProductsProvider>
        <PipelinesProvider>
          <PipelinesList />
          <EmptyHyperFunnel />
        </PipelinesProvider>
      </ProductsProvider>
    </TenantUsersProvider>
  );
}
