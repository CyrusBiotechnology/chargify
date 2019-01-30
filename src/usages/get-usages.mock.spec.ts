import * as nock from 'nock';
import { IChargifyUsage } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface IUsageMock {
  mock: nock.Scope;
  usages: IChargifyUsage[];
}

export function mockUsagesTest1(options: TestOptions): IUsageMock {
  const usages: IChargifyUsage[] = [
    {
      id: 101010,
      memo: 'testMemo',
      created_at: '2019-01-30T11:56:05-08:00',
      price_point_id: 202020,
      quantity: 3,
      component_id: options.usagesTest1.componentId,
      component_handle: 'component_handle',
      subscription_id: options.usagesTest1.subscriptionId,
    }
  ];

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/subscriptions/${options.usagesTest1.subscriptionId}/components/${options.usagesTest1.componentId}/usages.json`)
  .reply(200, usages.map(usage => ({usage}))) // wrap each usage object

  return {mock, usages};
}
