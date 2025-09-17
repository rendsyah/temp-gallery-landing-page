import { useCallback } from 'react';
import { cleanQuery } from '@/libs/utils/cleanQuery';
import { internalAPI } from '@/libs/interceptors/api-int.interceptor';

export const useInternal = () => {
  return useCallback((url: string, params = {}, options: RequestInit = {}) => {
    const query = cleanQuery(params);
    const searchParams = new URLSearchParams(query).toString();
    const target = searchParams ? `${url}?${searchParams}` : url;

    return internalAPI(target, options);
  }, []);
};
