import {IChargifyCustomer} from '../interfaces';
import {ChargifyApiError} from '../error';
import {get} from '../request';

export interface IGetCustomersRequest {}

export interface IGetCustomersResponse {
  error: Error | null;
  customers: IChargifyCustomer[] | null;
}

export async function getCustomers(subdomain: string, apiKey: string) {
  return async (): Promise<IGetCustomersResponse> => {
    const response = await get<{customer: IChargifyCustomer}[]>({
      path: '/customers.json',
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
