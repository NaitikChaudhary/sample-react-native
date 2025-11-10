import { AxiosRequestConfig } from 'axios';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export type PollingConfig = {
  interval: number;
  pollingName: string;
};

export type RetryConfig = {
  interval: number;
  retries: number;
};

export type RequestInfoType<T> = {
  url: string;
  data?: T;
  method?: HTTPMethod;
  config?: AxiosRequestConfig;
  pathParams?: { [key: string]: string | number | boolean };
  queryParams?: { [key: string]: string | number | boolean | Array<string> };
  pollingParams?: PollingConfig;
  retryParams?: RetryConfig;
  requestType?: RequestType;
  customHeaders?: { [key: string]: string | number | boolean | undefined };
  useRefreshInstance?: boolean;
  apiIdentifier?: string;
  signal?: AbortSignal;
};

export enum RequestType {
  NORMAL = 'NORMAL',
  NORMAL_WITH_RETRY = 'NORMAL_WITH_RETRY',
}
