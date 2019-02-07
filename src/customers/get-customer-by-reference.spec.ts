import test from 'ava';
import {getCustomerByReference} from './get-customer-by-reference';
import {TestOptions} from '../options.spec';
import {mockGetCustomerByReference1} from './get-customer-by-reference.mock.spec';

export function getCustomerByReferenceSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getCustomerByReference should return customer', async (t) => {
    const {customer, mock} = mockGetCustomerByReference1(options);
    const response = await getCustomerByReference(options.chargify.subdomain, options.chargify.apiKey)({
      reference: options.getCustomerByReferenceTest.reference,
    });
    t.deepEqual(response.customer, customer);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getCustomerByReference should return customer', async (t) => {
    const response = await getCustomerByReference(options.chargify.subdomain, options.chargify.apiKey)({
      reference: options.getCustomerByReferenceTest.reference,
    });
    t.is(response.error, null);
    t.is(response.customer.reference, options.getCustomerByReferenceTest.reference);
  })

  test('getCustomerByReference should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getCustomerByReference(options.chargify.subdomain, undefined)({
      reference: options.getCustomerByReferenceTest.reference,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.customer, null);
  })
}
