import {IChargifySubscription} from '../interfaces';
import {ChargifyApiError} from '../error';
import {post} from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

export interface ICreateSubscriptionRequest {
  productHandle: string;
  // If specified, customer created in addition to created subscription
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
  }
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
    customer_attributes?: {
      first_name: string;
      last_name: string;
      email: string;
      organization: string;
    },
    credit_card_attributes?: {
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

export function createSubscription(subdomain: string, apiKey: string) {
  return async (input: ICreateSubscriptionRequest): Promise<ICreateSubscriptionResponse> => {
    const requestBody: IChargifyCreateSubscriptionRequestBody = {
      subscription: {
        product_handle: input.productHandle,
      }
    };
    if (input.customer) {
      requestBody.subscription.customer_attributes = {
        first_name: input.customer.firstName,
        last_name: input.customer.lastName,
        email: input.customer.email,
        organization: input.customer.organization,
      };
    }
    if (input.creditCardAttributes) {
      requestBody.subscription.credit_card_attributes = {
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
    const response = await post<IChargifyCreateSubscriptionRequestBody, IChargifyCreateSubscriptionResponseBody>({
      path: '/subscriptions.json',
      subdomain,
      apiKey,
      body: requestBody,
    });
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to create subscription', errors),
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
