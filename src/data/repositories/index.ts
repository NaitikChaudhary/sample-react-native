import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  HTTPMethod,
  RequestInfoType,
  RequestType,
  RetryConfig,
} from './models';
import { sleep } from '../../utils/commonUtils';

class HttpClient {
  protected readonly instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
    this.instance.interceptors.request.use(request => {
      console.log(request, 'request');
      return request;
    });
  }

  processRequest<T = any, R = AxiosResponse<T>>(
    requestInfo: RequestInfoType<T>,
  ): Promise<R> {
    const { requestType = RequestType.NORMAL } = requestInfo;
    if (requestType === RequestType.NORMAL_WITH_RETRY) {
      return this.handleRetryRequest<T, R>(requestInfo);
    }

    return this.handleRequest<T, R>(requestInfo);
  }

  private getURLWithPathParams = (
    url: string,
    pathParams: { [key: string]: string | number | boolean },
  ): string => {
    return Object.keys(pathParams).reduce(
      (partialURL, key) => partialURL.replace(`{${key}}`, `${pathParams[key]}`),
      url,
    );
  };

  handleRequest<T = any, R = AxiosResponse<T>>(
    requestInfo: RequestInfoType<T>,
  ): Promise<R> {
    const { method, config = {}, data = {}, url = '' } = requestInfo;
    const networkInstance = this.instance;
    let finalURL = url;

    let finalConfig = config;

    if (requestInfo.queryParams || requestInfo.customHeaders) {
      const { queryParams = {}, customHeaders = {} } = requestInfo;
      finalConfig = Object.assign({}, finalConfig, {
        params: queryParams,
        headers: {
          ...config.headers,
          ...finalConfig.headers,
          ...customHeaders,
        },
      });
    }

    if (requestInfo.pathParams) {
      finalURL = this.getURLWithPathParams(url, requestInfo.pathParams);
    }

    switch (method) {
      case HTTPMethod.GET: {
        return networkInstance.get<T, R>(finalURL, finalConfig);
      }
      case HTTPMethod.POST: {
        return networkInstance.post<T, R>(finalURL, data, finalConfig);
      }
      case HTTPMethod.PUT: {
        return networkInstance.put<T, R>(finalURL, data, finalConfig);
      }
      case HTTPMethod.DELETE: {
        return networkInstance.delete<T, R>(finalURL, finalConfig);
      }
      case HTTPMethod.PATCH: {
        return networkInstance.patch<T, R>(finalURL, data, finalConfig);
      }
      default: {
        return networkInstance.request(finalConfig);
      }
    }
  }

  handleRetryRequest<T = any, R = AxiosResponse<T>>(
    requestInfo: RequestInfoType<T>,
  ): Promise<R> {
    const defaultRetryParams: RetryConfig = {
      interval: 2000,
      retries: 3,
    };
    const { retryParams = defaultRetryParams } = requestInfo;
    const { retries: maxRetries, interval } = retryParams;

    return new Promise(async (resolve, reject) => {
      let retries = 0;
      let success = false;
      let response: R, error: any;

      while (retries < maxRetries && !success) {
        try {
          response = await this.handleRequest<T, R>(requestInfo);
          resolve(response);
          success = true;
          break;
        } catch (err: any) {
          error = err;

          const statusCode = err?.status || err?.statusCode;
          if (
            typeof statusCode === 'number' &&
            statusCode >= 400 &&
            statusCode <= 599
          ) {
            reject(error);
            break;
          }
          const timeoutInterval = interval;
          if (timeoutInterval) {
            await sleep(timeoutInterval);
          }
          retries++;
        }
      }

      if (!success) {
        reject(error);
      }
    });
  }
}
export default HttpClient;
export type INetworkRepository = HttpClient;
