import { notFound } from 'next/navigation';
import { isAxiosError } from 'axios';
import { HttpStatus } from '../constants/httpStatus.const';

export const catchServerRoute = async (error: unknown) => {
  if (isAxiosError(error)) {
    console.error(error.response?.data, 'DEBUG');
    const response = {
      status: error.response?.status ?? 500,
      data: error.response?.data?.data ?? null,
      message: error.response?.data?.message ?? 'A server error occurred. Please try again later.',
      errorCode: error?.response?.data?.errorCode ?? 'INTERNAL_SERVER_ERROR',
      errors: error?.response?.data?.errors ?? [],
      traceId: error?.response?.data?.traceId ?? '',
    };

    return response;
  }

  throw error;
};

export const catchServerComponent = (error: unknown) => {
  if (isAxiosError(error)) {
    console.error(error.response?.data, 'DEBUG');
    const status = error.response?.status;
    const isNotFound = status === HttpStatus.NOT_FOUND;

    if (isNotFound) {
      notFound();
    }
  }

  throw error;
};
