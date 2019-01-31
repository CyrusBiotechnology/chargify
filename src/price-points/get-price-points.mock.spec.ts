import * as nock from 'nock';
import { IChargifyPricePoint } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface IPricePointMock {
  mock: nock.Scope;
  pricePoints: IChargifyPricePoint[];
}

export function mockGetPricePoints1(options: TestOptions): IPricePointMock {
  const componentId = options.pricePointsTest1.componentId;

  const pricePoints: IChargifyPricePoint[] = [
    {
      id: 101010,
      default: true,
      name: 'Price point name',
      pricing_scheme: 'per_unit',
      component_id: componentId,
      handle: '',
      archived_at: null,
      created_at: '',
      updated_at: '',
      prices: [{
        id: 202020,
        component_id: componentId,
        starting_quantity: 1,
        ending_quantity: null,
        unit_price: '5.7',
        price_point_id: 303030,
        formatted_unit_price: '$5.70',
      }]
    }
  ];

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/components/${componentId}/price_points.json`)
  .reply(200, {price_points: pricePoints}) // wrap price points

  return {mock, pricePoints};
}
