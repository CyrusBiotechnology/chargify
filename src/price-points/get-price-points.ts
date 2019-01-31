import {IChargifyPricePoint, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

export interface IGetPricePointsRequest {
  componentId: ChargifyId;
}

export interface IGetPricePointsResponse {
  error: ChargifyApiError | null;
  pricePoints: IChargifyPricePoint[] | null;
}

/**
 * Get price points for a Chargify component.
 */
export function getPricePoints(subdomain: string, apiKey: string) {
  return async (input: IGetPricePointsRequest): Promise<IGetPricePointsResponse> => {
    const response = await get<{price_points: IChargifyPricePoint[]}>({
      path: `/components/${input.componentId}/price_points.json`,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to get price points'),
        pricePoints: null,
      };
    }
    const responseBody = await response.json();
    // unwrap
    const pricePoints = responseBody.price_points;
    return {
      error: null,
      pricePoints,
    };
  }
}
