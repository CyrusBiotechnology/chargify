import { IChargifyProduct } from '../interfaces';
import { ChargifyApiError } from '../error';
import { ChargifyId } from '../interfaces';
import { get } from '../request';
import {extractErrorsFromResponse} from '../util/extract-errors-from-response';

export interface IGetProductsRequest {
  productFamilyId: ChargifyId;
}

export interface IGetProductsResponse {
  error: ChargifyApiError | null;
  products: IChargifyProduct[] | null;
}

export function getProducts(subdomain: string, apiKey: string) {
  /**
   * Get all products for the given product family.
   */
  return async (input: IGetProductsRequest): Promise<IGetProductsResponse> => {
    const response = await get<{product: IChargifyProduct}[]>({
      path: `/product_families/${input.productFamilyId}/products.json`,
      subdomain: subdomain,
      apiKey: apiKey,
    });
    if (!response.ok) {
      const errors = await extractErrorsFromResponse(response);
      return {
        error: new ChargifyApiError(response.status, 'Failed to get products', errors),
        products: null,
      };
    }
    const rawProducts = await response.json();
    const products = rawProducts.map((product) => product.product);
    return {
      error: null,
      products,
    };
  }
}
