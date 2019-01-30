export type ChargifyId = number;
export type ChargifyDate = string | null;

export interface IChargifyComponent {
  id: ChargifyId;
  product_family_id: ChargifyId;
  default_price_point_id: ChargifyId;
  name: string;
  handle: string;
  kind: 'metered_component' | 'quantity_based_component';
  description: string;
  archived: boolean;
  unit_name: string;
  unit_price: string;
  pricing_scheme: 'per_unit';
  price_per_unit_in_cents: null;
  prices: {
    id: ChargifyId;
    component_id: ChargifyId;
    starting_quantity: number;
    ending_quantity: number | null;
    unit_price: string;
    price_point_id: ChargifyId;
    formatted_unit_price: string;
  }[];
  price_point_count: number;
  price_points_url: string;
  taxable: boolean;
  tax_code: string;
  recurring: boolean;
}

export interface IChargifyCustomer {
  id: ChargifyId;
  organization: string;
  first_name: string;
  last_name: string;
  email: string;
  cc_emails: string;
  reference: string;
  created_at: ChargifyDate;
  updated_at: ChargifyDate;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  verified: boolean;
  portal_customer_created_at: ChargifyDate;
  portal_invite_last_sent_at: ChargifyDate;
  portal_invite_last_accepted_at: ChargifyDate;
  tax_exempt: boolean;
  vat_number: string;
}

export interface IChargifySubscription {
  id: ChargifyId;
  customer: IChargifyCustomer;
  product: IChargifyProduct;
  state: 'active',
    balance_in_cents: number;
  total_revenue_in_cents: number;
  product_price_in_cents: number;
  product_version_number: number;
  current_period_ends_at: ChargifyDate;
  next_assessment_at: ChargifyDate;
  trial_started_at: ChargifyDate;
  trial_ended_at: ChargifyDate;
  activated_at: ChargifyDate;
  expires_at: ChargifyDate;
  created_at: ChargifyDate;
  updated_at: ChargifyDate;
  cancellation_message: string | null;
  cancellation_method: string | null;
  cancel_at_end_of_period: boolean;
  canceled_at: ChargifyDate;
  current_period_started_at: ChargifyDate;
  previous_state: 'active',
    signup_payment_id: ChargifyId;
  signup_revenue: string;
  delayed_cancel_at: ChargifyDate;
  coupon_code: null;
  coupon_codes: string[];
  payment_collection_method: 'automatic',
    snap_day: string | null;
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
      id: ChargifyId;
      payment_type: 'credit_card',
      first_name: string;
      last_name: string;
      masked_card_number: string;
      card_type: string;
      expiration_month: number;
      expiration_year: number;
      billing_address: string | null;
      billing_address_2: string | null;
      billing_city: string | null;
      billing_state: string | null;
      billing_country: string | null;
      billing_zip: string | null;
      current_vault: string;
      vault_token: string;
      customer_vault_token: string | null;
      customer_id: number;
      disabled: boolean;
    }
}

export interface IChargifyProduct {
  id: ChargifyId;
  name: string;
  handle: string;
  description: string;
  accounting_code: string;
  price_in_cents: number;
  interval: number;
  interval_unit: 'month',
    initial_charge_in_cents: null,
    expiration_interval: number | null;
  expiration_interval_unit: 'never',
    trial_price_in_cents: number | null;
  trial_interval: number | null;
  trial_interval_unit: 'month';
  initial_charge_after_trial: boolean;
  return_params: string;
  request_credit_card: true,
    require_credit_card: true,
    created_at: ChargifyDate;
  updated_at: ChargifyDate;
  archived_at: ChargifyDate;
  update_return_url: string;
  tax_code: string;
  update_return_params: string;
  product_family: {
      id: ChargifyId;
      name: string;
      handle: string;
      accounting_code: string | null;
      description: string;
    },
    public_signup_pages: {
      id: ChargifyId;
      url: string;
    } [],
    taxable: boolean;
  version_number: number;
}
