import {getComponent, IGetComponentRequest, IGetComponentResponse} from './components/get-component';
import {getComponents, IGetComponentsRequest, IGetComponentsResponse} from './components/get-components';
import {getCustomers, IGetCustomersRequest, IGetCustomersResponse} from './customers/get-customers';
import {getSubscriptions, IGetSubscriptionsResponse, IGetSubscriptionsRequest} from './subscriptions/get-subscriptions';
import {getUsages, IGetUsagesRequest, IGetUsagesResponse} from './usages/get-usages';
import {getPricePoints, IGetPricePointsRequest, IGetPricePointsResponse} from './price-points/get-price-points';
import {getProducts, IGetProductsRequest, IGetProductsResponse} from './products/get-products';
import {createAdjustment, ICreateAdjustmentRequest, ICreateAdjustmentResponse} from './adjustments/create-adjustment';

export class ChargifyClient {
  private _options: IChargifyClientOptions;

  constructor(options: IChargifyClientOptions) {
    this._options = options;
  }

  public async createAdjustment(input: ICreateAdjustmentRequest): Promise<ICreateAdjustmentResponse> {
    return createAdjustment(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getComponent(input: IGetComponentRequest): Promise<IGetComponentResponse> {
    return getComponent(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getComponents(input: IGetComponentsRequest): Promise<IGetComponentsResponse> {
    return getComponents(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getCustomers(input?: IGetCustomersRequest): Promise<IGetCustomersResponse> {
    return getCustomers(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getPricePoints(input: IGetPricePointsRequest): Promise<IGetPricePointsResponse> {
    return getPricePoints(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getSubscriptions(input?: IGetSubscriptionsRequest): Promise<IGetSubscriptionsResponse> {
    return getSubscriptions(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getUsages(input: IGetUsagesRequest): Promise<IGetUsagesResponse> {
    return getUsages(this._options.subdomain, this._options.apiKey)(input);
  }

  public async getProducts(input: IGetProductsRequest): Promise<IGetProductsResponse>{
    return getProducts(this._options.subdomain, this._options.apiKey)(input);
  }
}

export interface IChargifyClientOptions {
  apiKey: string;
  subdomain: string;
}
