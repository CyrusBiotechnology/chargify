import {IChargifyComponent, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

export interface IGetComponentsRequest {
  productFamilyId: ChargifyId;
}

export interface IGetComponentsResponse {
  error: ChargifyApiError | null;
  components: IChargifyComponent[] | null;
}

export function getComponents(subdomain: string, apiKey: string) {
  /**
   * Get all components for the given product family.
   */
  return async (input: IGetComponentsRequest): Promise<IGetComponentsResponse> => {
    const response = await get<{component: IChargifyComponent}[]>({
      path: `/product_families/${input.productFamilyId}/components.json`,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to get components', errors),
        components: null,
      };
    }
    const rawComponents = await response.json();
    const components = rawComponents.map((component) => component.component);
    return {
      error: null,
      components,
    };
  }
}
