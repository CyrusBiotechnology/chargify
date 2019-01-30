import {IChargifyUsage, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

export interface IGetUsagesRequest {
  componentId: ChargifyId;
  subscriptionId: ChargifyId;
}

export interface IGetUsagesResponse {
  error: ChargifyApiError | null;
  usages: IChargifyUsage[] | null;
}

export function getUsages(subdomain: string, apiKey: string) {
  /**
   * Get all usages for the given subscription and component.
   */
  return async (input: IGetUsagesRequest): Promise<IGetUsagesResponse> => {
    const response = await get<{usage: IChargifyUsage}[]>({
      path: `/subscriptions/${input.subscriptionId}/components/${input.componentId}/usages.json`,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to get usages'),
        usages: null,
      };
    }
    const rawUsages = await response.json();
    const usages = rawUsages.map((usage) => usage.usage);
    return {
      error: null,
      usages,
    };
  }
}
