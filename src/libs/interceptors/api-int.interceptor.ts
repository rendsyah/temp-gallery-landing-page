import { Api } from '../constants/api.const';
import { HttpStatus } from '../constants/httpStatus.const';

type InternalApiOptions = RequestInit & {
  onUnauthorized?: () => void;
  onForbidden?: () => void;
};

export const internalAPI = async (url: string, options: InternalApiOptions = {}) => {
  try {
    const target = Api.API_GATEWAY + url;
    const response = await fetch(target, options);

    if (response.status === HttpStatus.UNAUTHORIZED && options.onUnauthorized) {
      options.onUnauthorized();
    }

    return response;
  } catch (error) {
    throw error;
  }
};
