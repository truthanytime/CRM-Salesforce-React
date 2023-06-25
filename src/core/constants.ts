import { ProductCategory, ProductCurrency, ProductRateChargeType } from 'providers/ProductsProvider';
import { OptionValue, UserType } from './types';
import {
  mapUserRoleToLabel,
  mapProductRateChargeTypeToLabel,
  mapProductCategoryToLabel,
  mapProductCurrencyToLabel,
} from './utils';

export const AUTH_SESSION_KEY = 'customerCity/AUTH_SESSION_KEY';

export const NAV_BAR_HEIGHT = 56;

export const DRAWER_MENU_WIDTH = 280;

export const DRAWER_MENU_BOTTOM_SECTION_HEIGHT = 160;

export const PUBLIC_ABS_ROUTE_PATHS = {
  login: '/auth/login',
  createPassword: '/auth/create-password',
  resetPassword: '/auth/reset-password',
};

export const PRIVATE_ROUTE_PATHS = {
  home: '/d',
  contacts: 'contacts',
  contactDetail: 'contacts/:id',
  accounts: 'accounts',
  accountDetail: 'accounts/:id',
  productDefiner: 'product-definer',
  hyperFunnel: 'hyper-funnel',
  journeyBuilder: 'hyper-funnel/:id/journey-builder',
  dealScape: 'deal-scape',
  dealScapeDetail: 'deal-scape/:id',
  controlTower: 'control-tower',
  integration: 'integration',
  integrationDetail: 'integration/:id',
  integrationRedirect: 'integration-redirect/:id',
  dataRaptor: 'data-raptor',
  dataValidation: 'data-validation',
  duplicateDetection: 'duplicate-detection',
  newRule: 'new-rule',

  lightSquare: 'light-square',
  dashboard: 'dashboard',
  goalsAndMilestones: 'goals-milestones',
  forecast: 'forecast',
  revenueSimulation: 'revenue-simulation',
  //
  myAccount: 'my-account',
  createCompany: 'create-company',
  settings: 'settings',
  more: 'more',
  completeProfileOne: '/profile-one',
  completeProfileTwo: '/profile-two',
};

export const PRIVATE_ABS_ROUTE_PATHS = {
  home: '/d',
  contacts: '/d/contacts',
  contactDetail: '/d/contacts/:id',
  accounts: '/d/accounts',
  accountDetail: '/d/accounts/:id',
  productDefiner: '/d/product-definer',
  hyperFunnel: '/d/hyper-funnel',
  journeyBuilder: '/d/hyper-funnel/:id/journey-builder',
  dealScape: '/d/deal-scape',
  dealScapeDetail: '/d/deal-scape/:id',
  controlTower: '/d/control-tower',
  integration: '/d/integration',
  integrationDetail: '/d/integration/:id',
  integrationRedirect: '/d/integration-redirect/:id',
  lightSquare: '/d/light-square',
  dashboard: '/d/light-square/dashboard',
  goalsMilestones: '/d/light-square/goals-milestones',
  forecast: '/d/light-square/forecast',
  revenueSimulation: '/d/light-square/revenue-simulation',
  dataRaptor: '/d/data-raptor',
  //
  createCompany: '/d/create-company',
  myAccount: '/d/my-account',
  settings: '/d/settings',
  more: '/d/more',
};

export const PHONE_REGEX = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const USER_ROLE_OPTIONS = Object.values(UserType).reduce(
  (acc: OptionValue<UserType>[], role): OptionValue<UserType>[] => {
    if (role === UserType.SUPER_AMIN) return acc;
    return [...acc, { label: mapUserRoleToLabel(role), value: role }];
  },
  [],
);

export const WORKERS_NUMBER_OPTIONS = [
  { label: '1', value: '1' },
  { label: '2 to 5', value: '2-5' },
  { label: '6 to 10', value: '6-10' },
  { label: '11 to 25', value: '11-25' },
  { label: '26 to 50', value: '26-50' },
  { label: '51 to 200', value: '51-200' },
  { label: '201 to 1,000', value: '201-1000' },
  { label: '1,001 to 10,000', value: '1001-10000' },
  { label: '10,000 or more', value: '>=10000' },
];

export const WEBSITE_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

export const PRODUCT_RATE_CHARGE_TYPE_OPTIONS = [
  { label: 'Not selected', value: '' },
  ...Object.values(ProductRateChargeType).map((type) => ({
    label: mapProductRateChargeTypeToLabel(type),
    value: type,
  })),
];

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: 'Not selected', value: '' },
  ...Object.values(ProductCategory).map((category) => ({
    label: mapProductCategoryToLabel(category),
    value: category,
  })),
];

export const PRODUCT_CURRENCY_OPTIONS = [
  ...Object.values(ProductCurrency).map((category) => ({
    label: mapProductCurrencyToLabel(category),
    value: category,
  })),
];

export enum DATA_MIGRATION_STATUS {
  REQUESTED = 'requested',
  DATA_SCHEMA_STARTED = 'schema-started',
  DATA_SCHEMA_COMPLETED = 'schema-completed',
  DATA_SCHEMA_FAILED = 'schema-failed',
  DATA_MIGRATION_STARTED = 'migration-started',
  DATA_MIGRATION_COMPLETED = 'migration-completed',
  DATA_MIGRATION_FAILED = 'migration-failed',
}

export const CONTACT_ASSOCIATES_DEMO = [
  { label: 'Alan', value: '1' },
  { label: 'Beil', value: '2' },
];

const getBucketName = () => process.env.REACT_APP_S3_BUCKET_NAME || `customercity-uploads`;
const getS3Url = () => process.env.REACT_APP_S3_URL || `https://${getBucketName()}.s3.amazonaws.com`;
export const s3Config = {
  bucketName: getBucketName(),
  dirName: 'documents' /* Optional */,
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID ?? '',
  secretAccessKey: process.env.REACT_APP_AWS_SECURITY_KEY ?? '',
  s3Url: getS3Url(),
};

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}; // from Firebase Console

export const firestoreBasePath = `${process.env.REACT_APP_ENV || 'production'}/main`;

export const mapDBColumnsAndFilterTypeInDataRaptor = new Map<string, string>([
  ['id', 'number'],
  ['boolean', 'number'],
  ['reference', 'text'],
  ['double', 'number'],
  ['currency', 'number'],
  ['int', 'number'],
  ['string', 'text'],
  ['textarea', 'text'],
  ['phone', 'text'],
  ['url', 'text'],
  ['datetime', 'date'],
  ['date', 'date'],
  ['picklist', 'dropdown'],
]);

export enum TENANT_UPDATES_EVENT_TYPES {
  RULE_APPLIED = 'rule-applied',
  DATA_SYNCHRONIZED = 'data-synchronized',
}
