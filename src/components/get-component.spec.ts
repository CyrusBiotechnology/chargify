import test from 'ava';
import {getComponent} from './get-component';
import {TestOptions} from '../options.spec';
import {mockGetComponent1, mockGetComponent1ByHandle} from './get-component.mock.spec';

export function getComponentSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getComponent should get a single component by component ID', async (t) => {
    const {component, mock} = mockGetComponent1(options);
    const response = await getComponent(options.chargify.subdomain, options.chargify.apiKey)({
      productFamilyId: options.chargify.productFamilyId,
      requestType: 'id',
      componentId: options.chargify.component1Id,
    });
    t.deepEqual(response.component, component);
    mock.done();
  })

  test('getComponent should get a single component by component handle', async (t) => {
    const {component, mock} = mockGetComponent1ByHandle(options);
    const response = await getComponent(options.chargify.subdomain, options.chargify.apiKey)({
      productFamilyId: options.chargify.productFamilyId,
      requestType: 'handle',
      componentHandle: options.chargify.component1Handle,
    });
    t.deepEqual(response.component, component);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getComponent should get a single component', async (t) => {
    const response = await getComponent(options.chargify.subdomain, options.chargify.apiKey)({
      productFamilyId: options.chargify.productFamilyId,
      requestType: 'id',
      componentId: options.chargify.component1Id,
    });
    t.is(response.error, null);
    t.is(response.component.id, options.chargify.component1Id);
  })

  test('getComponent should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getComponent(options.chargify.subdomain, undefined)({
      productFamilyId: options.chargify.productFamilyId,
      requestType: 'id',
      componentId: options.chargify.component1Id,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.component, null);
  })
}
