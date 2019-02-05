import {IChargifySubscription, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get, IResponse} from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

export interface IGetSubscriptionsRequest {
  customerId?: ChargifyId;
}

export interface IGetSubscriptionsResponse {
  error: ChargifyApiError | null;
  subscriptions: IChargifySubscription[] | null;
}

type IChargifySubscriptionsResponse = IResponse<{subscription: IChargifySubscription}[]>;

export function getSubscriptions(subdomain: string, apiKey: string) {
  return async (input?: IGetSubscriptionsRequest): Promise<IGetSubscriptionsResponse> => {
    let response: IChargifySubscriptionsResponse;
    if (input && input.customerId) {
      response = await get({
        path: `/customers/${input.customerId}/subscriptions.json`,
        subdomain,
        apiKey,
      });
    } else {
      response = await get({
        path: '/subscriptions.json',
        subdomain,
        apiKey,
      });
    }
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to get subscriptions', errors),
        subscriptions: null,
      };
    }
    const rawSubscriptions = await response.json();
    const subscriptions = rawSubscriptions.map((subscription) => subscription.subscription);
    return {
      error: null,
      subscriptions,
    };
  }
}
