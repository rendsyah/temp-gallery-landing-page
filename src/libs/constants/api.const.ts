export class Api {
  // AXIOS
  static readonly MAX_TIMEOUT = 12000;
  static readonly API_GATEWAY = '/v1';
  static readonly API_PREFIX = '/api/v1';
  static readonly API_MEDIA = '/media';
  static readonly API_BASE_URL = process.env.API_BASE_URL + Api.API_PREFIX;
  static readonly API_MEDIA_URL = process.env.API_BASE_URL + Api.API_MEDIA;
}
