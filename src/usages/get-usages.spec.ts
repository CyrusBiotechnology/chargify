import test from 'ava';
import {getUsages} from './get-usages';
import {TestOptions} from '../options.spec';
import {mockUsagesTest1} from './get-usages.mock.spec';

export function getUsagesSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getUsages should return list of usages', async (t) => {
    const {usages, mock} = mockUsagesTest1(options);
    const response = await getUsages(options.chargify.subdomain, options.chargify.apiKey)({
      componentId: options.usagesTest1.componentId,
      subscriptionId: options.usagesTest1.subscriptionId,
    });
    t.deepEqual(response.usages, usages);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getUsages should return list of usages', async (t) => {
    const response = await getUsages(options.chargify.subdomain, options.chargify.apiKey)({
      componentId: options.usagesTest1.componentId,
      subscriptionId: options.usagesTest1.subscriptionId
    });
    t.is(response.error, null);
    t.true(Array.isArray(response.usages));
  })

  test('getUsages should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getUsages(options.chargify.subdomain, undefined)({
      componentId: options.usagesTest1.componentId,
      subscriptionId: options.usagesTest1.subscriptionId
    });
    t.is(response.error.statusCode, 401);
    t.is(response.usages, null);
  })
}
