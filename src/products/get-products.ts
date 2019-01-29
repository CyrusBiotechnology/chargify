import { IChargifyProduct } from "../interfaces";
import {ChargifyApiError} from '../error';
import { get } from '../request';

export interface IGetProductsRequest {}

export interface IGetProductsResponseBody {
  error: ChargifyApiError | null;
  products: IChargifyProduct[] | null;
}

export async function getProducts(product_family_id: number, apiKey: string, subdomain: string) {
    return async (): Promise<IGetProductsResponseBody> => {
        const response = await get<{product: IChargifyProduct[]}>({
            path: `/product_families/${product_family_id}/products.json`,
            apiKey: apiKey,
            subdomain: subdomain,
        });
        if (!response.ok) {
            return {
              error: new ChargifyApiError(response.status, 'Failed to get products'),
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