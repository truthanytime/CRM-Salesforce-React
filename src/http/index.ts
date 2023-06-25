import axios, { AxiosRequestConfig } from 'axios';
import { accept20x, getErrorMessage } from './utils';

const baseURL = process.env.REACT_APP_API_URL;

const http = axios.create({ baseURL });

export const apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    console.log(baseURL);
    const { status, data } = await http(config);
    if (!accept20x(status)) {
      throw new Error(data?.message);
    }

    return data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default http;
