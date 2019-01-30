import test from 'ava';
import {getComponents} from './get-components';
import {TestOptions} from '../options.spec';
import {mockGetComponents1} from './get-components.mock.spec';

export function getComponentsSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getComponents should return list of components', async (t) => {
    const {components, mock} = mockGetComponents1(options);
    const response = await getComponents(options.chargify.subdomain, options.chargify.apiKey)({productFamilyId: options.chargify.productFamilyId});
    t.deepEqual(response.components, components);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getComponents should return list of components', async (t) => {
    const response = await getComponents(options.chargify.subdomain, options.chargify.apiKey)({productFamilyId: options.chargify.productFamilyId});
    t.is(response.error, null);
    t.true(Array.isArray(response.components));
  })

  test('getComponents should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getComponents(options.chargify.subdomain, undefined)({productFamilyId: options.chargify.productFamilyId});
    t.is(response.error.statusCode, 401);
    t.is(response.components, null);
  })
}
