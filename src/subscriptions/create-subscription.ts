import {IChargifySubscription} from '../interfaces';
import {ChargifyApiError} from '../error';
import {post} from '../request';

export interface ICreateSubscriptionRequest {
  product_handle: string;
  customer_attributes: {
    first_name: string;
    last_name: string;
    email: string;
    organization: string;
  },
  credit_card_attributes: {
    full_number: string;
    expiration_month: string;
    expiration_year: string;
    billing_address: string;
    billing_city: string;
    billing_state: string;
    billing_zip: string;
    billing_country: string;
    cvv: string;
  }
}

export interface ICreateSubscriptionResponse {
  error: ChargifyApiError | null;
  subscription: IChargifySubscription | null;
}

interface IChargifyCreateSubscriptionRequestBody {
  subscription: ICreateSubscriptionRequest;
}

interface IChargifyCreateSubscriptionResponseBody {
  subscription: IChargifySubscription;
}

export function createSubscription(subdomain: string, apiKey: string) {
  return async (request: ICreateSubscriptionRequest): Promise<ICreateSubscriptionResponse> => {
    const response = await post<IChargifyCreateSubscriptionRequestBody, IChargifyCreateSubscriptionResponseBody>({
      path: '/subscriptions.json',
      subdomain,
      apiKey,
      body: {subscription: request},
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to create subscription'),
        subscription: null,
      };
    }
    const rawSubscription = await response.json();
    const subscription = rawSubscription.subscription;
    return {
      error: null,
      subscription,
    };
  }
}
