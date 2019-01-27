import {getCustomers, IGetCustomersResponse} from './customers/get-customers';
import {getSubscriptions, IGetSubscriptionsResponse} from './subscriptions/get-subscriptions';

export class ChargifyClient {
  private _options: IChargifyClientOptions;

  constructor(options: IChargifyClientOptions) {
    this._options = options;
  }

  public async getCustomers(): Promise<IGetCustomersResponse> {
    return getCustomers(this._options.subdomain, this._options.apiKey)();
  }

  public async getSubscriptions(): Promise<IGetSubscriptionsResponse> {
    return getSubscriptions(this._options.subdomain, this._options.apiKey)();
  }
}

export interface IChargifyClientOptions {
  apiKey: string;
  subdomain: string;
}
