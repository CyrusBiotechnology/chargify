import * as nock from 'nock';
import { IChargifyCustomer } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface ICustomerMock {
  mock: nock.Scope;
  customer: IChargifyCustomer;
}

export function mockGetCustomerByReference1(options: TestOptions): ICustomerMock {
  const customer: IChargifyCustomer = {
    id: 10101,
    organization: '',
    first_name: '',
    last_name: '',
    email: '',
    cc_emails: '',
    reference: options.getCustomerByReferenceTest.reference,
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
  };

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get('/customers/lookup.json')
  .query({reference: options.getCustomerByReferenceTest.reference})
  .reply(200, {customer});

  return {mock, customer};
}
