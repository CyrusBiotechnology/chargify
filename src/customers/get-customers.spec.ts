import test from 'ava';
import {getCustomers} from './get-customers';

interface TestOptions {
  apiKey: string;
  subdomain: string;
}

const defaultOptions: TestOptions = {
  subdomain: 'testSubdomain',
  apiKey: 'testApiKey',
};

export function getCustomersSpec(options?: TestOptions) {
  options = {
    ...defaultOptions,
    ...options,
  };

  test('getCustomers should return list of customers', async (t) => {
    const response = await getCustomers(options.subdomain, options.apiKey)();
    t.pass();
  })
};
