'use server';

import type { CreateTransaction } from '@/types/transaction.types';
import { responseServerRoute } from '@/libs/utils/response.utils';
import { catchServerRoute } from '@/libs/utils/catch.utils';
import { Routes } from '@/libs/constants/routes.const';
import { externalAPI } from '@/libs/interceptors/api-ext.interceptor';

export const CreateTransactionApi = async (data: CreateTransaction) => {
  return await externalAPI
    .post(Routes.TRANSACTION, data)
    .then((response) => responseServerRoute(response))
    .catch((error) => catchServerRoute(error));
};
