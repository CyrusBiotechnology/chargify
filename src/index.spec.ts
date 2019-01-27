import {getCustomersSpec} from './customers/get-customers.spec';
import {TestOptions} from './options.spec';

const options: TestOptions = {
  subdomain: 'testSubdomain',
  apiKey: 'testApiKey',
};

getCustomersSpec(options);
