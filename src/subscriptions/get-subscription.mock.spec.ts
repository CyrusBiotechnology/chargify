import * as nock from 'nock';
import { IChargifySubscription } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface ISubscriptionMock {
  mock: nock.Scope;
  subscription: IChargifySubscription;
}

export function mockGetSubscription1(options: TestOptions): ISubscriptionMock {
  const subscriptionId = options.getSubscriptionTest.subscriptionId;
  const subscription: IChargifySubscription = {
    id: subscriptionId,
    customer: {
      id: options.getSubscriptionsTest.customerId,
      organization: '',
      first_name: '',
      last_name: '',
      email: '',
      cc_emails: '',
      reference: '',
      created_at: '',
      updated_at: '',
      address: '',
      address_2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: '',
      verified: true,
      portal_customer_created_at: '',
      portal_invite_last_sent_at: '',
      portal_invite_last_accepted_at: '',
      tax_exempt: true,
      vat_number: '',
    },
    product: {
      id: 1,
      name: '',
      handle: '',
      description: '',
      accounting_code: '',
      price_in_cents: 1,
      interval: 1,
      interval_unit: 'month',
      initial_charge_in_cents: null,
      expiration_interval: null,
      expiration_interval_unit: 'never',
      trial_price_in_cents: null,
      trial_interval: null,
      trial_interval_unit: 'month',
      initial_charge_after_trial: false,
      return_params: '',
      request_credit_card: true,
      require_credit_card: true,
      created_at: '',
      updated_at: '',
      archived_at: '',
      update_return_url: '',
      tax_code: '',
      update_return_params: '',
      product_family: {
        id: 1,
        name: '',
        handle: '',
        accounting_code: null,
        description: '',
      },
      public_signup_pages: [],
      taxable: false,
      version_number: 1,
    },
    state: 'active',
    balance_in_cents: 1,
    total_revenue_in_cents: 1,
    product_price_in_cents: 1,
    product_version_number: 1,
    current_period_ends_at: '',
    next_assessment_at: '',
    trial_started_at: '',
    trial_ended_at: '',
    activated_at: '',
    expires_at: '',
    created_at: '',
    updated_at: '',
    cancellation_message: null,
    cancellation_method: null,
    cancel_at_end_of_period: false,
    canceled_at: '',
    current_period_started_at: '',
    previous_state: 'active',
    signup_payment_id: 1,
    signup_revenue: '',
    delayed_cancel_at: '',
    coupon_code: null,
    coupon_codes: [],
    payment_collection_method: 'automatic',
    snap_day: null,
    payment_type: 'credit_card',
    referral_code: null,
    next_product_id: null,
    coupon_use_count: null,
    coupon_uses_allowed: null,
    reason_code: null,
    automatically_resume_at: null,
    offer_id: null,
    receives_invoice_emails: null,
    credit_card: {
      id: 1,
      payment_type: 'credit_card',
      first_name: '',
      last_name: '',
      masked_card_number: '',
      card_type: '',
      expiration_month: 1,
      expiration_year: 1,
      billing_address: null,
      billing_address_2: null,
      billing_city: null,
      billing_state: null,
      billing_country: null,
      billing_zip: null,
      current_vault: '',
      vault_token: '',
      customer_vault_token: null,
      customer_id: 1,
      disabled: false,
    }
  };

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/subscriptions/${subscriptionId}.json`)
  .reply(200, {subscription});

  return {mock, subscription};
}
