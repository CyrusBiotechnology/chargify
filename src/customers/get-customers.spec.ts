import test from 'ava';
import {getCustomers} from './get-customers';
import {TestOptions} from '../options.spec';
import {mockCustomers1} from './mock-customers.spec';

export function getCustomersSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getCustomers should return list of customers', async (t) => {
    const {customers, mock} = mockCustomers1(options);
    const response = await getCustomers(options.chargify.subdomain, options.chargify.apiKey)();
    t.deepEqual(response.customers, customers);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getCustomers should return list of customers', async (t) => {
    const response = await getCustomers(options.chargify.subdomain, options.chargify.apiKey)();
    t.is(response.error, null);
    t.true(Array.isArray(response.customers));
  })

  test('getCustomers should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getCustomers(options.chargify.subdomain, undefined)();
    t.is(response.error.statusCode, 401);
    t.is(response.customers, null);
  })
}
