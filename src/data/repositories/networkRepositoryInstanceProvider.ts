import { API_URL } from '@env';
import HttpClient, { INetworkRepository } from '.';

export class NetworkRepositoryInstanceProvider {
  private static authClient: INetworkRepository;

  static getRepositoryInstance(): INetworkRepository {
    if (!NetworkRepositoryInstanceProvider.authClient) {
      NetworkRepositoryInstanceProvider.authClient = new HttpClient(
        API_URL || '',
      );
    }
    return NetworkRepositoryInstanceProvider.authClient;
  }
}
