import {getCustomersSpec} from './customers/get-customers.spec';
import {TestOptions} from './options.spec';

// Generate test options
const options: TestOptions = {
  chargify: {
    skipMocks: process.env.TEST_CHARGIFY_SKIP_MOCKS === 'true', // default false (use mocks)
    apiKey: process.env.TEST_CHARGIFY_API_KEY || 'testApiKey',
    subdomain: process.env.TEST_CHARGIFY_SUBDOMAIN || 'testSubdomain',
  }
}

// Run tests
getCustomersSpec(options);
