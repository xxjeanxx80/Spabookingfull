export interface ApiResponse<T> {
  data: T;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  requestId?: string;
  timestamp: string;
  [key: string]: unknown;
}

export const createApiResponse = <T>(data: T, metadata: ResponseMetadata = { timestamp: new Date().toISOString() }): ApiResponse<T> => ({
  data,
  metadata,
});
