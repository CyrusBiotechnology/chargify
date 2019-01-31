import test from 'ava';
import {getPricePoints} from './get-price-points';
import {TestOptions} from '../options.spec';
import {mockGetPricePoints1} from './get-price-points.mock.spec';

export function getPricePointsSpec(options: TestOptions) {
  options.chargify.skipMocks ? testWithoutMocks(options) : testWithMocks(options);
}

function testWithMocks(options: TestOptions) {
  test('getPricePoints should return a list of price points', async (t) => {
    const {pricePoints, mock} = mockGetPricePoints1(options);
    const response = await getPricePoints(options.chargify.subdomain, options.chargify.apiKey)({
      componentId: options.pricePointsTest1.componentId,
    });
    t.deepEqual(response.pricePoints, pricePoints);
    mock.done();
  })
}

function testWithoutMocks(options: TestOptions) {
  test('getPricePoints should return a list of price points', async (t) => {
    const response = await getPricePoints(options.chargify.subdomain, options.chargify.apiKey)({
      componentId: options.pricePointsTest1.componentId,
    });
    t.is(response.error, null);
    t.true(Array.isArray(response.pricePoints));
  })

  test('getPricePoints should return error with HTTP status code 401 when no API key provided', async (t) => {
    const response = await getPricePoints(options.chargify.subdomain, undefined)({
      componentId: options.pricePointsTest1.componentId,
    });
    t.is(response.error.statusCode, 401);
    t.is(response.pricePoints, null);
  })
}
