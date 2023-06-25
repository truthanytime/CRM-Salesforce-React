import { ReactNode } from 'react';

export interface NavRoute {
  name: string;
  path: string;
  Icon?: ReactNode;
  nestedRoutes?: NavRoute[];
  notifications?: number;
}
