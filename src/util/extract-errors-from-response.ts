import { IResponse } from '../request';

/**
 * When Chargify reports an error, the response body
 * looks like this for all requests: {errors: string[]}
 */
export async function extractErrorsFromResponse(response: IResponse<any>): Promise<string[]> {
  try {
    const responseBody: {errors: string[]} = await response.json();
    return responseBody.errors;
  } catch (e) {
    // In case Chargify does not return a body or some other error occurs,
    // return an empty array.
    return [];
  }
}
