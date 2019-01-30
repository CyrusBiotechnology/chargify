import * as nock from 'nock';
import { IChargifyComponent } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface IComponentMock {
  mock: nock.Scope;
  components: IChargifyComponent[];
}

export function mockGetComponents1(options: TestOptions): IComponentMock {
  const components: IChargifyComponent[] = [
    {
      id: 10101,
      product_family_id: options.chargify.productFamilyId,
      default_price_point_id: 30303,
      name: 'Component Name',
      handle: 'component',
      kind: 'metered_component',
      description: 'Component description',
      archived: false,
      unit_name: 'unit',
      unit_price: '5.70',
      pricing_scheme: 'per_unit',
      price_per_unit_in_cents: null,
      prices: [
        {
          id: 909090,
          component_id: 505050,
          starting_quantity: 1,
          ending_quantity: null,
          unit_price: '5.7',
          price_point_id: 303030,
          formatted_unit_price: '$5.70'
        }
      ],
      price_point_count: 1,
      price_points_url: 'https://example.chargify.com/components/101010/price_points',
      taxable: false,
      tax_code: '',
      recurring: false,
    }
  ];

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/product_families/${options.chargify.productFamilyId}/components.json`)
  .reply(200, components.map(component => ({component}))) // wrap each component object

  return {mock, components};
}
