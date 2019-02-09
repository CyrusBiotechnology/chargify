import test from 'ava';
import {getSubscription} from './get-subscription';
import {TestOptions} from '../options.spec';
import {mockGetSubscription1} from './get-subscription.mock.spec';

export function getSubscriptionSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getSubscription should return subscription', async (t) => {
    const {subscription, mock} = mockGetSubscription1(options);
    const response = await getSubscription(options.chargify.subdomain, options.chargify.apiKey)({
      subscriptionId: options.getSubscriptionTest.subscriptionId,
    });
    t.deepEqual(response.subscription, subscription);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getSubscription should return subscription', async (t) => {
    const response = await getSubscription(options.chargify.subdomain, options.chargify.apiKey)({
      subscriptionId: options.getSubscriptionTest.subscriptionId,
    });
    t.is(response.error, null);
    t.is(response.subscription.id, options.getSubscriptionTest.subscriptionId);
  })

  test('getSubscription should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getSubscription(options.chargify.subdomain, undefined)({
      subscriptionId: options.getSubscriptionTest.subscriptionId,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.subscription, null);
  })
}
