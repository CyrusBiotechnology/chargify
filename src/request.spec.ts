import test from 'ava';
import * as nock from 'nock';
import {TestOptions} from './options.spec';
import {getAllPages} from './request';

interface MockResource {
  key1: string;
  key2: number;
}

export function requestSpec(options: TestOptions) {
  if (options.chargify.skipMocks) {
    return;
  }

  test('getAllPages should return single page of Chargify objects', async (t) => {
    const path = '/test_path';

    const page1 = [
      {
        key1: 'value1',
        key2: 1,
      },
      {
        key1: 'value2',
        key2: 2,
      }
    ];

    const mockedPage1 = nock(`https://${options.chargify.subdomain}.chargify.com`)
    .get(path)
    .query({page: 1, per_page: 20})
    .reply(200, page1)

    const response = await getAllPages<MockResource>({
      apiKey: options.chargify.apiKey,
      subdomain: options.chargify.subdomain,
      path,
    });
    t.true(response.ok);
    t.deepEqual(await response.json(), page1);
    mockedPage1.done();
  })

  test('getAllPages should return multiple pages of Chargify objects', async (t) => {
    const path = '/test_path';
    const testPerPage = 2;

    const page1 = [
      {
        key1: 'value1',
        key2: 1,
      },
      {
        key1: 'value2',
        key2: 2,
      }
    ];

    const page2 = [
      {
        key1: 'value3',
        key2: 3,
      }
    ];

    const mockedPage1 = nock(`https://${options.chargify.subdomain}.chargify.com`)
    .get(path)
    .query({page: 1, per_page: 2})
    .reply(200, page1)

    const mockedPage2 = nock(`https://${options.chargify.subdomain}.chargify.com`)
    .get(path)
    .query({page: 2, per_page: 2})
    .reply(200, page2)

    const response = await getAllPages<MockResource>({
      apiKey: options.chargify.apiKey,
      subdomain: options.chargify.subdomain,
      path,
      perPage: testPerPage,
    });
    t.true(response.ok);
    t.deepEqual(await response.json(), [...page1, ...page2]);
    mockedPage1.done();
    mockedPage2.done();
  })

  test('getAllPages should return first error from Chargify', async (t) => {
    const path = '/test_path';

    const mockedError = nock(`https://${options.chargify.subdomain}.chargify.com`)
    .get(path)
    .query(true)
    .reply(422)

    const response = await getAllPages<MockResource>({
      apiKey: options.chargify.apiKey,
      subdomain: options.chargify.subdomain,
      path,
    });

    t.false(response.ok);
    t.is(response.status, 422);
    mockedError.done();
  })
}
