import {IChargifyComponent, ChargifyId} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

interface IGetComponentRequestBase {
  productFamilyId: ChargifyId;
}

interface IGetComponentRequestWithId extends IGetComponentRequestBase {
  requestType: 'id';
  componentId: ChargifyId;
}

interface IGetComponentRequestWithHandle extends IGetComponentRequestBase {
  requestType: 'handle';
  componentHandle: string;
}

export type IGetComponentRequest = IGetComponentRequestWithId | IGetComponentRequestWithHandle;

export interface IGetComponentResponse {
  error: ChargifyApiError | null;
  component: IChargifyComponent | null;
}

export function getComponent(subdomain: string, apiKey: string) {
  /**
   * Get single component (by ID or by handle) in the given product family.
   */
  return async (input: IGetComponentRequest): Promise<IGetComponentResponse> => {
    let componentIdentifier: string;
    switch (input.requestType) {
      case 'id': {
        componentIdentifier = `${input.componentId}`;
        break;
      }
      case 'handle': {
        componentIdentifier = `handle:${input.componentHandle}`;
        break;
      }
      default: {
        throw new Error('TODO');
      }
    }
    const response = await get<{component: IChargifyComponent}>({
      path: `/product_families/${input.productFamilyId}/components/${componentIdentifier}.json`,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to get component'),
        component: null,
      };
    }
    const rawComponent = await response.json();
    const component = rawComponent.component;
    return {
      error: null,
      component,
    };
  }
}
