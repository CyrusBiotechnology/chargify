import {IChargifySubscription} from '../interfaces';
import {ChargifyApiError} from '../error';
import {post} from '../request';

export interface ICreateSubscriptionRequest {
  productHandle: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
  }
  // If not specified, filled out with dummy values
  creditCardAttributes?: {
    fullNumber: string;
    expirationMonth: string;
    expirationYear: string;
    billingAddress: string;
    billingCity: string;
    billingState: string;
    billingZip: string;
    billingCountry: string;
    cvv: string;
  }
}

export interface ICreateSubscriptionResponse {
  error: ChargifyApiError | null;
  subscription: IChargifySubscription | null;
}

interface IChargifyCreateSubscriptionRequestBody {
  subscription: {
    product_handle: string;
    customer_attributes: {
      first_name: string;
      last_name: string;
      email: string;
      organization: string;
    },
    credit_card_attributes: {
      full_number: string;
      expiration_month: string;
      expiration_year: string;
      billing_address: string;
      billing_city: string;
      billing_state: string;
      billing_zip: string;
      billing_country: string;
      cvv: string;
    }
  }
}

interface IChargifyCreateSubscriptionResponseBody {
  subscription: IChargifySubscription;
}

export function createSubscriptionWithCustomer(subdomain: string, apiKey: string) {
  return async (input: ICreateSubscriptionRequest): Promise<ICreateSubscriptionResponse> => {
    // dummy values
    let credit_card_attributes = {
      full_number: '1',
      expiration_month: '10',
      expiration_year: '2020',
      billing_address: 'x',
      billing_city: 'x',
      billing_state: 'x',
      billing_zip: '00000',
      billing_country: 'x',
      cvv: '111',
    };
    if (input.creditCardAttributes) {
      credit_card_attributes = {
        full_number: input.creditCardAttributes.fullNumber,
        expiration_month: input.creditCardAttributes.expirationMonth,
        expiration_year: input.creditCardAttributes.expirationYear,
        billing_address: input.creditCardAttributes.billingAddress,
        billing_city: input.creditCardAttributes.billingCity,
        billing_state: input.creditCardAttributes.billingState,
        billing_zip: input.creditCardAttributes.billingZip,
        billing_country: input.creditCardAttributes.billingCountry,
        cvv: input.creditCardAttributes.cvv,
      };
    }

    const requestBody: IChargifyCreateSubscriptionRequestBody = {
      subscription: {
        product_handle: input.productHandle,
        customer_attributes: {
          first_name: input.customer.firstName,
          last_name: input.customer.lastName,
          email: input.customer.email,
          organization: input.customer.organization,
        },
        credit_card_attributes,
      }
    };
    const response = await post<IChargifyCreateSubscriptionRequestBody, IChargifyCreateSubscriptionResponseBody>({
      path: '/subscriptions.json',
      subdomain,
      apiKey,
      body: requestBody,
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to create subscription'),
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
