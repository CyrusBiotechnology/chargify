import test from 'ava';
import {getCustomers} from './get-customers';
import {TestOptions} from '../options.spec';
import * as nock from 'nock';
import { IChargifyCustomer } from '../../lib/interfaces';

export function getCustomersSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getCustomers should return list of customers', async (t) => {
    // mock
    const expectedCustomers: IChargifyCustomer[] = [
      {
        id: 10101,
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
      }
    ];
    const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
    .get('/customers.json')
    .reply(200, expectedCustomers.map(customer => ({customer}))) // wrap each customer object
    const response = await getCustomers(options.chargify.subdomain, options.chargify.apiKey)();
    t.deepEqual(response.customers, expectedCustomers);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {

}
