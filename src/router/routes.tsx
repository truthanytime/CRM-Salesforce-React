import { Route } from 'react-router-dom';

import { PRIVATE_ROUTE_PATHS } from 'core/constants';
import { PanelLayout } from 'components/PanelLayout';
import {
  Contact,
  Account,
  CreateCompany,
  Dashboard,
  ControlTower,
  ProductDefiner,
  CompleteProfileOne,
  CompleteProfileTwo,
  ContactDetail,
  DataRaptor,
} from 'pages';
import DummyPage from './DummyPage';
import { AccountDetail } from 'pages/AccountDetail';
import { DealDetail } from 'pages/DealDetail';
import { Deal } from 'pages/Deal';
import { HyperFunnel } from 'pages/HyperFunnel';
import { Integration } from 'pages/Integration';
import { IntegrationDetail } from 'pages/IntegrationDetail';
import { IntegrationRedirect } from 'pages/IntegrationRedirect';
import JourneyBuilder from 'pages/HyperFunnel/components/JourneyBuilder';
import { DataValidation } from 'pages/DataValidation';
import DuplicateDetectionPage from 'pages/DuplicateDetection';
import { NewRule } from 'pages/NewRule';

interface AppRoute {
  path?: string;
  index?: boolean;
  element?: JSX.Element;
  nestedRoutes?: AppRoute[];
}

export const dashboardRoutes: AppRoute[] = [
  {
    path: PRIVATE_ROUTE_PATHS.home,
    element: <PanelLayout />,
    nestedRoutes: [
      { index: true, path: PRIVATE_ROUTE_PATHS.home, element: <Dashboard /> },
      { path: PRIVATE_ROUTE_PATHS.contacts, element: <Contact /> },
      { path: PRIVATE_ROUTE_PATHS.contactDetail, element: <ContactDetail /> },
      { path: PRIVATE_ROUTE_PATHS.accounts, element: <Account /> },
      { path: PRIVATE_ROUTE_PATHS.accountDetail, element: <AccountDetail /> },
      { path: PRIVATE_ROUTE_PATHS.productDefiner, element: <ProductDefiner /> },
      { path: PRIVATE_ROUTE_PATHS.hyperFunnel, element: <HyperFunnel /> },
      { path: PRIVATE_ROUTE_PATHS.journeyBuilder, element: <JourneyBuilder /> },
      { path: PRIVATE_ROUTE_PATHS.dealScape, element: <Deal /> },
      { path: PRIVATE_ROUTE_PATHS.dealScapeDetail, element: <DealDetail /> },
      { path: PRIVATE_ROUTE_PATHS.controlTower, element: <ControlTower /> },
      { path: PRIVATE_ROUTE_PATHS.integration, element: <Integration /> },
      { path: PRIVATE_ROUTE_PATHS.integrationDetail, element: <IntegrationDetail /> },
      { path: PRIVATE_ROUTE_PATHS.integrationRedirect, element: <IntegrationRedirect /> },
      { path: PRIVATE_ROUTE_PATHS.dataRaptor, element: <DataRaptor /> },
      { path: PRIVATE_ROUTE_PATHS.dataValidation, element: <DataValidation></DataValidation> },
      { path: PRIVATE_ROUTE_PATHS.duplicateDetection, element: <DuplicateDetectionPage></DuplicateDetectionPage> },
      { path: PRIVATE_ROUTE_PATHS.newRule, element: <NewRule></NewRule> },
      {
        path: PRIVATE_ROUTE_PATHS.lightSquare,
        element: <DummyPage />,
        nestedRoutes: [
          { index: true, path: PRIVATE_ROUTE_PATHS.dashboard, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.goalsAndMilestones, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.forecast, element: <DummyPage /> },
          { path: PRIVATE_ROUTE_PATHS.revenueSimulation, element: <DummyPage /> },
        ],
      },
      { path: PRIVATE_ROUTE_PATHS.myAccount, element: <Account /> },
      { path: PRIVATE_ROUTE_PATHS.createCompany, element: <CreateCompany /> },
      { path: PRIVATE_ROUTE_PATHS.settings, element: <DummyPage /> },
      { path: PRIVATE_ROUTE_PATHS.more, element: <DummyPage /> },
    ],
  },
];

export const profileRoutes = [
  { path: PRIVATE_ROUTE_PATHS.completeProfileOne, element: <CompleteProfileOne /> },
  { path: PRIVATE_ROUTE_PATHS.completeProfileTwo, element: <CompleteProfileTwo /> },
];

export const renderRoute = ({ nestedRoutes, ...route }: AppRoute, idx: number) => {
  if (!nestedRoutes?.length) return <Route key={`${route.path}+${idx}`} {...route} />;

  return (
    <Route key={`${route.path}+${idx}`} {...route}>
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {nestedRoutes.map(renderRoute)}
    </Route>
  );
};
