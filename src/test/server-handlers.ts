import { rest } from 'msw';

import { loginData, currentUserData, usersData, productsData, companiesData } from './data';

export const TEST_BASE_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:3005';

export const getApiPath = (path: string): string => {
  return `${TEST_BASE_URL}/${path}`;
};

export const handlers = [
  rest.post(getApiPath('auth/login'), async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        message: 'Successfully logged in.',
        data: loginData,
      }),
    );
  }),
  rest.get(getApiPath('user/auth/current'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Current user fetched successfully!',
        data: currentUserData,
      }),
    );
  }),
  rest.get(getApiPath('user'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Users fetched successfully!',
        data: usersData,
      }),
    );
  }),
  rest.put(getApiPath('user/:id'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'User updated successfully!',
        data: null,
      }),
    );
  }),
  rest.get(getApiPath('product'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Products fetched successfully!',
        data: productsData,
      }),
    );
  }),
  rest.get(getApiPath('company'), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        message: 'Companies fetched succesfully!',
        data: companiesData,
      }),
    );
  }),
];
