import test from 'ava';
import {createSubscription} from './create-subscription';
import {TestOptions} from '../options.spec';
import {mockCreateSubscription1} from './create-subscription.mock.spec';

export function createSubscriptionSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('createSubscription should create a subscription in Chargify', async (t) => {
    const {subscription, mock} = mockCreateSubscription1(options);
    const response = await createSubscription(options.chargify.subdomain, options.chargify.apiKey)({
      productHandle: options.createSubscriptionTest.productHandle,
      customer: options.createSubscriptionTest.customer,
    });
    t.deepEqual(response.subscription, subscription);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('createSubscription should create a subscription in Chargify', async (t) => {
    const response = await createSubscription(options.chargify.subdomain, options.chargify.apiKey)({
      productHandle: options.createSubscriptionTest.productHandle,
      customer: options.createSubscriptionTest.customer,
    });
    t.is(response.error, null);
    t.is(response.subscription.product.handle, options.createSubscriptionTest.productHandle);
    t.is(response.subscription.customer.first_name, options.createSubscriptionTest.customer.firstName);
    t.is(response.subscription.customer.last_name, options.createSubscriptionTest.customer.lastName);
    t.is(response.subscription.customer.email, options.createSubscriptionTest.customer.email);
    t.is(response.subscription.customer.organization, options.createSubscriptionTest.customer.organization);
  })

  test('createSubscription should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await createSubscription(options.chargify.subdomain, undefined)({
      productHandle: options.createSubscriptionTest.productHandle,
      customer: options.createSubscriptionTest.customer,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.subscription, null);
  })
}
