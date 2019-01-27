import test from 'ava';
import {getSubscriptions} from './get-subscriptions';
import {TestOptions} from '../options.spec';
import {mockGetSubscriptions1} from './get-subscriptions.mock.spec';

export function getSubscriptionsSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getSubscriptions should return list of subscriptions', async (t) => {
    const {subscriptions, mock} = mockGetSubscriptions1(options);
    const response = await getSubscriptions(options.chargify.subdomain, options.chargify.apiKey)();
    t.deepEqual(response.subscriptions, subscriptions);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getSubscriptions should return list of subscriptions', async (t) => {
    const response = await getSubscriptions(options.chargify.subdomain, options.chargify.apiKey)();
    t.is(response.error, null);
    t.true(Array.isArray(response.subscriptions));
  })

  test('getSubscriptions should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getSubscriptions(options.chargify.subdomain, undefined)();
    t.is(response.error.statusCode, 401);
    t.is(response.subscriptions, null);
  })
}
