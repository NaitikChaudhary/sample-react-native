import { AxiosResponse } from 'axios';
import { INetworkRepository } from '.';
import { HomeLayoutResponse } from '../../module/home/types';
import { getNetworkRequestInfo, LayoutServiceType } from '../service/layout';
import { NetworkRepositoryInstanceProvider } from './networkRepositoryInstanceProvider';

class LayoutRepository {
  private networkRepository: INetworkRepository;
  constructor(networkRepository: INetworkRepository) {
    this.networkRepository = networkRepository;
  }

  fetchHomeLayout(): Promise<AxiosResponse<HomeLayoutResponse>> {
    const modelInfo = {
      type: LayoutServiceType.FETCH_HOME_LAYOUT,
    };
    const fetchLayoutForPageTypeRequest =
      getNetworkRequestInfo<void>(modelInfo);
    return this.networkRepository.processRequest<
      void,
      AxiosResponse<HomeLayoutResponse>
    >(fetchLayoutForPageTypeRequest);
  }
  fetchCartLayout(): Promise<AxiosResponse<HomeLayoutResponse>> {
    const modelInfo = {
      type: LayoutServiceType.FETCH_CART_LAYOUT,
    };
    const fetchLayoutForPageTypeRequest =
      getNetworkRequestInfo<void>(modelInfo);
    return this.networkRepository.processRequest<
      void,
      AxiosResponse<HomeLayoutResponse>
    >(fetchLayoutForPageTypeRequest);
  }
  fetchSearchLayout(): Promise<AxiosResponse<HomeLayoutResponse>> {
    const modelInfo = {
      type: LayoutServiceType.FETCH_SEARCH_LAYOUT,
    };
    const fetchLayoutForPageTypeRequest =
      getNetworkRequestInfo<void>(modelInfo);
    return this.networkRepository.processRequest<
      void,
      AxiosResponse<HomeLayoutResponse>
    >(fetchLayoutForPageTypeRequest);
  }
}

export class LayoutRepositoryInstanceProvider {
  private static instance: ILayoutRepository;

  static getRepositoryInstance(): ILayoutRepository {
    if (!LayoutRepositoryInstanceProvider.instance) {
      const networkRepository =
        NetworkRepositoryInstanceProvider.getRepositoryInstance();

      LayoutRepositoryInstanceProvider.instance = new LayoutRepository(
        networkRepository,
      );
    }
    return LayoutRepositoryInstanceProvider.instance;
  }
}

export type ILayoutRepository = InstanceType<typeof LayoutRepository>;
