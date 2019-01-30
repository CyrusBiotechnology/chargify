import * as nock from 'nock';
import { IChargifyComponent, ChargifyId } from '../interfaces';
import { TestOptions } from '../options.spec';

export interface IComponentMock {
  mock: nock.Scope;
  component: IChargifyComponent;
}

export function mockGetComponent1(options: TestOptions): IComponentMock {
  const componentId = options.chargify.component1Id;
  const component = createMockComponent(options.chargify.productFamilyId, options.chargify.component1Id, options.chargify.component1Handle);

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/product_families/${options.chargify.productFamilyId}/components/${componentId}.json`)
  .reply(200, {component}) // wrap component object

  return {mock, component};
}

export function mockGetComponent1ByHandle(options: TestOptions): IComponentMock {
  const componentHandle = options.chargify.component1Handle;
  const component = createMockComponent(options.chargify.productFamilyId, options.chargify.component1Id, options.chargify.component1Handle);

  // base64-encoded Chargify credentials
  const basicAuth = Buffer.from(`${options.chargify.apiKey}:x`).toString('base64');

  const mock = nock(`https://${options.chargify.subdomain}.chargify.com`)
  .matchHeader('Authorization', `Basic ${basicAuth}`)
  .get(`/product_families/${options.chargify.productFamilyId}/components/handle:${componentHandle}.json`)
  .reply(200, {component}) // wrap component object

  return {mock, component};
}

function createMockComponent(productFamilyId: ChargifyId, componentId: ChargifyId, componentHandle: string): IChargifyComponent {
  return {
    id: componentId,
    product_family_id: productFamilyId,
    default_price_point_id: 30303,
    name: 'Component Name',
    handle: componentHandle,
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
        component_id: componentId,
        starting_quantity: 1,
        ending_quantity: null,
        unit_price: '5.7',
        price_point_id: 303030,
        formatted_unit_price: '$5.70'
      }
    ],
    price_point_count: 1,
    price_points_url: 'https://example.chargify.com/component/101010/price_points',
    taxable: false,
    tax_code: '',
    recurring: false,
  };
}
