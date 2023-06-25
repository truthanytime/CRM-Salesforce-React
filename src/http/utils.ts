import { AxiosError } from 'axios';

export const accept20x = (status: number): boolean => /20[0-9]/.test(String(status));

export const accept5xx = (status: number): boolean => /5[0-9][0-9]/.test(String(status));

export const isNetWorkError = (error: AxiosError): boolean => !!error.isAxiosError && !error.response;

export const getErrorMessage = (error: any, getDataError = false): string | undefined => {
  if (error && error.response) {
    if (!getDataError) return error.response.data?.message;

    let errorMessage = '';

    const dataErrors: string[] | undefined = error.response.data?.data?.errors;

    if (dataErrors?.length) {
      errorMessage = `${dataErrors[0].charAt(0).toUpperCase() + dataErrors[0].substring(1).toLowerCase()}`;
    }

    if (errorMessage === '') errorMessage = error.response.data?.message;

    return errorMessage;
  }

  if (error.reason) {
    return error.reason?.message;
  }

  return undefined;
};
