import {IChargifySubscription} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

export interface IGetSubscriptionsRequest {}

export interface IGetSubscriptionsResponse {
  error: ChargifyApiError | null;
  subscriptions: IChargifySubscription[] | null;
}

export function getSubscriptions(subdomain: string, apiKey: string) {
  return async (): Promise<IGetSubscriptionsResponse> => {
    const response = await get<{subscription: IChargifySubscription}[]>({
      path: '/subscriptions.json',
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to get subscriptions'),
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
