import test from 'ava';
import {getCustomers} from './get-customers';
import {TestOptions} from '../options.spec';

export function getCustomersSpec(options: TestOptions) {
  test('getCustomers should return list of customers', async (t) => {
    const response = await getCustomers(options.chargify.subdomain, options.chargify.apiKey)();
    t.pass();
  })
};
