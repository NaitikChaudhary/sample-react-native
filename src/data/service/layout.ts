import { HTTPMethod, RequestInfoType } from '../repositories/models';

export enum LayoutServiceType {
  FETCH_HOME_LAYOUT = 'FETCH_LAYOUT',
  FETCH_CART_LAYOUT = 'FETCH_CART_LAYOUT',
  FETCH_SEARCH_LAYOUT = 'FETCH_SEARCH_LAYOUT',
}

export type RequestModel<T> = {
  type: LayoutServiceType;
  data?: T;
} & Partial<RequestInfoType<T>>;

enum ServiceURL {
  URL_FETCH_HOME_LAYOUT = 'home.json',
  URL_FETCH_CART_LAYOUT = 'cart.json',
  URL_FETCH_SEARCH_LAYOUT = 'search.json',
}

export function getNetworkRequestInfo<T>(
  model: RequestModel<T>,
): RequestInfoType<T> {
  switch (model.type) {
    case LayoutServiceType.FETCH_HOME_LAYOUT: {
      return {
        url: ServiceURL.URL_FETCH_HOME_LAYOUT,
        method: HTTPMethod.GET,
        queryParams: model.queryParams,
        pathParams: model.pathParams,
      };
    }
    case LayoutServiceType.FETCH_CART_LAYOUT: {
      return {
        url: ServiceURL.URL_FETCH_CART_LAYOUT,
        method: HTTPMethod.GET,
        queryParams: model.queryParams,
        pathParams: model.pathParams,
      };
    }
    case LayoutServiceType.FETCH_SEARCH_LAYOUT: {
      return {
        url: ServiceURL.URL_FETCH_SEARCH_LAYOUT,
        method: HTTPMethod.GET,
        queryParams: model.queryParams,
        pathParams: model.pathParams,
      };
    }
  }
}
