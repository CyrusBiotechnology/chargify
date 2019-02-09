import {IChargifySubscription, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

export interface IGetSubscriptionRequest {
  subscriptionId: ChargifyId;
}

export type IGetSubscriptionResponse = (
  { error: null, subscription: IChargifySubscription } |
  { error: ChargifyApiError, subscription: null }
);

export function getSubscription(subdomain: string, apiKey: string) {
  return async (input: IGetSubscriptionRequest): Promise<IGetSubscriptionResponse> => {
    const subscriptionId = input.subscriptionId;
    const response = await get<{subscription: IChargifySubscription}>({
      path: `/subscriptions/${subscriptionId}.json`,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to get subscription', errors),
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
