import {TestOptions} from './options.spec';
import {getComponentSpec} from './components/get-component.spec';
import {getComponentsSpec} from './components/get-components.spec';
import {getCustomersSpec} from './customers/get-customers.spec';
import {getSubscriptionsSpec} from './subscriptions/get-subscriptions.spec';

const productFamilyId = process.env.TEST_CHARGIFY_PRODUCT_FAMILY_ID && parseInt(process.env.TEST_CHARGIFY_PRODUCT_FAMILY_ID) || 100000;
const component1Id = process.env.TEST_CHARGIFY_COMPONENT_1_ID && parseInt(process.env.TEST_CHARGIFY_COMPONENT_1_ID) || 200000;

// Generate test options
const options: TestOptions = {
  chargify: {
    skipMocks: process.env.TEST_CHARGIFY_SKIP_MOCKS === 'true', // default false (use mocks)
    apiKey: process.env.TEST_CHARGIFY_API_KEY || 'testApiKey',
    subdomain: process.env.TEST_CHARGIFY_SUBDOMAIN || 'testSubdomain',
    productFamilyId,
    component1Id,
  }
}

// Run tests
getComponentSpec(options);
getComponentsSpec(options);
getCustomersSpec(options);
getSubscriptionsSpec(options);
