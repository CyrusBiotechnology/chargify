import { IChargifyProduct } from "../interfaces";
import {ChargifyApiError} from '../error';
import { get } from '../request';

export interface IGetProductsRequest {}

export interface IGetProductsResponse {
  error: ChargifyApiError | null;
  products: IChargifyProduct[] | null;
}

export async function getProducts(product_family_id: number, apiKey: string, subdomain: string): Promise<IChargifyProduct[]> {
    
    const response = await get<{product: IChargifyProduct}[]>({
        path: `/product_families/${product_family_id}/products.json`,
        apiKey: apiKey,
        subdomain: subdomain,
      });
    if (response.statusCode !== 200) {
      console.error(response.statusCode, JSON.stringify(response.body, null, 2));
    }
    return response.body.map((product) => product.product)
}