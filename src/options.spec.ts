import { ChargifyId } from './interfaces';

export interface TestOptions {
  chargify: {
    skipMocks: boolean;
    apiKey: string;
    subdomain: string;
    productFamilyId: ChargifyId;
    component1Id: ChargifyId;
    component1Handle: string;
  }
}
