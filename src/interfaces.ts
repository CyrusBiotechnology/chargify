type ChargifyId = number;
type ChargifyDate = string | null;

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
