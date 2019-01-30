import {getComponent, IGetComponentRequest, IGetComponentResponse} from './components/get-component';
import {getComponents, IGetComponentsRequest, IGetComponentsResponse} from './components/get-components';
import {getCustomers, IGetCustomersResponse} from './customers/get-customers';
import {getSubscriptions, IGetSubscriptionsResponse} from './subscriptions/get-subscriptions';

export class ChargifyClient {
  private _options: IChargifyClientOptions;

  constructor(options: IChargifyClientOptions) {
    this._options = options;
  }

  public async getComponent(input: IGetComponentRequest): Promise<IGetComponentResponse> {
    return getComponent(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getComponents(input: IGetComponentsRequest): Promise<IGetComponentsResponse> {
    return getComponents(this._options.subdomain, this._options.apiKey)(input);
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
