import * as nock from 'nock';
import { IChargifyAdjustment } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface IComponentMock {
  mock: nock.Scope;
  adjustment: IChargifyAdjustment;
}

export function mockCreateAdjustment1(options: TestOptions): IComponentMock {
  const subscriptionId = options.createAdjustmentTest.subscriptionId;
  const amount = options.createAdjustmentTest.amount;
  const memo = options.createAdjustmentTest.memo;
  const adjustment: IChargifyAdjustment = {
    id: 100000,
    success: true,
    memo: memo,
    amount_in_cents: 100 * amount,
    starting_balance_in_cents: 10,
    ending_balance_in_cents: 10 + 100 * amount,
    type: 'Adjustment',
    transaction_type: 'adjustment',
    subscription_id: subscriptionId,
    customer_id: 200000,
    product_id: 300000,
    created_at: '2019-02-01T02:20:27-08:00',
    payment_id: null,
    statement_id: 400000,
  };

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .post(`/subscriptions/${subscriptionId}/adjustments.json`, {adjustment: {amount, memo}})
  .reply(200, {adjustment}) // wrap adjustment object

  return {mock, adjustment};
}
