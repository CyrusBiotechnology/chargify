import {IChargifyCustomer} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

export interface IGetCustomersRequest {
  // query value should be one of: email, ID, reference, organization
  // https://reference.chargify.com/v1/customers/search-for-customer
  query?: string;
}

export interface IGetCustomersResponse {
  error: ChargifyApiError | null;
  customers: IChargifyCustomer[] | null;
}

export function getCustomers(subdomain: string, apiKey: string) {
  return async (input?: IGetCustomersRequest): Promise<IGetCustomersResponse> => {
    let queryParams: {q?: string};
    if (input) {
      queryParams = {};
      if (input.query) {
        queryParams.q = input.query;
      }
    }
    const response = await get<{customer: IChargifyCustomer}[]>({
      path: '/customers.json',
      queryParams,
      subdomain,
      apiKey,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to get customers'),
        customers: null,
      };
    }
    const rawCustomers = await response.json();
    const customers = rawCustomers.map((customer) => customer.customer);
    return {
      error: null,
      customers,
    };
  }
}
