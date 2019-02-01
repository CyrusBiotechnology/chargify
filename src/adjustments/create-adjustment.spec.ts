import test from 'ava';
import {createAdjustment} from './create-adjustment';
import {TestOptions} from '../options.spec';
import {mockCreateAdjustment1} from './create-adjustment.mock.spec';

export function createAdjustmentSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('createAdjustment should post a subscription adjustment to Chargify', async (t) => {
    const {adjustment, mock} = mockCreateAdjustment1(options);
    const response = await createAdjustment(options.chargify.subdomain, options.chargify.apiKey)({
      subscriptionId: options.createAdjustmentTest.subscriptionId,
      amount: options.createAdjustmentTest.amount,
      memo: options.createAdjustmentTest.memo,
    });
    t.deepEqual(response.adjustment, adjustment);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('createAdjustment should post a subscription adjustment to Chargify', async (t) => {
    const response = await createAdjustment(options.chargify.subdomain, options.chargify.apiKey)({
      subscriptionId: options.createAdjustmentTest.subscriptionId,
      amount: options.createAdjustmentTest.amount,
      memo: options.createAdjustmentTest.memo,
    });
    t.is(response.error, null);
    t.is(response.adjustment.subscription_id, options.createAdjustmentTest.subscriptionId);
    t.is(response.adjustment.amount_in_cents, options.createAdjustmentTest.amount * 100);
    t.is(response.adjustment.memo, options.createAdjustmentTest.memo);
  })

  test('createAdjustment should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await createAdjustment(options.chargify.subdomain, undefined)({
      subscriptionId: options.createAdjustmentTest.subscriptionId,
      amount: options.createAdjustmentTest.amount,
      memo: options.createAdjustmentTest.memo,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.adjustment, null);
  })
}
