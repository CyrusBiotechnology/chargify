import {getCustomersSpec} from './customers/get-customers.spec';
import {TestOptions} from './options.spec';

// Generate test options
const options: TestOptions = {
  chargify: {
    shouldBeMocked: process.env.TEST_CHARGIFY_SHOULD_BE_MOCKED === 'true',
    apiKey: process.env.TEST_CHARGIFY_API_KEY || 'testApiKey',
    subdomain: process.env.TEST_CHARGIFY_SUBDOMAIN || 'testSubdomain',
  }
}

// Run tests
getCustomersSpec(options);
