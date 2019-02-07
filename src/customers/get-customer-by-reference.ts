import {IChargifyCustomer} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

// https://reference.chargify.com/v1/customers/read-the-customer-by-reference-value
export interface IGetCustomerByReferenceRequest {
  reference: string;
}

export type IGetCustomerByReferenceResponse = (
  { error: null, customer: IChargifyCustomer } |
  { error: ChargifyApiError, customer: null }
);

export function getCustomerByReference(subdomain: string, apiKey: string) {
  return async (input: IGetCustomerByReferenceRequest): Promise<IGetCustomerByReferenceResponse> => {
    const queryParams = {reference: input.reference};
    const response = await get<{customer: IChargifyCustomer}>({
      path: '/customers/lookup.json',
      queryParams,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to get customer by reference', errors),
        customer: null,
      };
    }
    const rawCustomer = await response.json();
    const customer = rawCustomer.customer;
    return {
      error: null,
      customer,
    };
  }
}
