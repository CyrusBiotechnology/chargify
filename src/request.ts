import fetch, { Response, ResponseInit } from 'node-fetch';
import * as url from 'url';

/**
 * Request interfaces
 */

export interface IRequest {
  apiKey: string;
  subdomain: string;
  path: string;
}

export interface IGetRequest extends IRequest {
  queryParams?: {
    [key: string]: string;
  }
}

export interface IPostRequest<T> extends IRequest {
  body: T;
}

export interface IPutRequest<T> extends IRequest {
  body: T;
}

export interface IDeleteRequest<T> extends IRequest {
}

export interface IGetAllPagesRequest extends IRequest {
  perPage?: number;
}

/**
 * Response interface with parameterized body type
 */

export interface IResponse<T> extends Response {
  json(): Promise<T>;
}

export async function get<ResponseBody>(request: IGetRequest): Promise<IResponse<ResponseBody>> {
  const urlString = url.format({
    ...getCommonUrlParameters(request),
    query: request.queryParams,
  });
  return fetch(urlString, {
    method: 'GET',
    headers: getCommonHeaders(request),
  });
}

export async function post<RequestBody, ResponseBody>(request: IPostRequest<RequestBody>): Promise<IResponse<ResponseBody>> {
  const urlString = url.format(getCommonUrlParameters(request));
  return fetch(urlString, {
    method: 'POST',
    headers: getCommonHeaders(request),
    body: JSON.stringify(request.body),
  });
}

export async function put<RequestBody, ResponseBody>(request: IPutRequest<RequestBody>): Promise<IResponse<ResponseBody>> {
  const urlString = url.format(getCommonUrlParameters(request));
  return fetch(urlString, {
    method: 'PUT',
    headers: getCommonHeaders(request),
    body: JSON.stringify(request.body),
  });
}

export async function del<RequestBody, ResponseBody>(request: IDeleteRequest<RequestBody>): Promise<IResponse<ResponseBody>> {
  const urlString = url.format(getCommonUrlParameters(request));
  return fetch(urlString, {
    method: 'DELETE',
    headers: getCommonHeaders(request),
  });
}

/**
 * Make as many page requests as necessary to get all resources.
 * When the first error occurs, stop making page requests and
 * return that error.
 */
export async function getAllPages<T>(request: IGetAllPagesRequest): Promise<IResponse<T[]>> {
  const perPageDefault = 20; // 20 is also the default in Chargify
  const perPage = request.perPage || perPageDefault;
  let allResources: T[] = [];
  let page = 1;
  let shouldGetNextPage = true;
  while (shouldGetNextPage) {
    const pageRequest: IGetRequest = {
      apiKey: request.apiKey,
      subdomain: request.subdomain,
      path: request.path,
      queryParams: {
        page: `${page}`,
        per_page: `${perPage}`,
      }
    };
    const pageResponse = await get<T[]>(pageRequest);
    if (!pageResponse.ok) {
      return pageResponse;
    }
    const resources = await pageResponse.json();
    allResources = [
      ...allResources,
      ...resources,
    ];
    // Get next page until current page has less than the page limit
    if (resources.length < perPage) {
      shouldGetNextPage = false;
    } else {
      page++;
    }
  }
  const responseBody = JSON.stringify(allResources);
  const responseInit: ResponseInit = {status: 200};
  return new Response(responseBody, responseInit);
}

function getCommonUrlParameters(request: IRequest): url.UrlObject {
  return {
    protocol: 'https',
    hostname: `${request.subdomain}.chargify.com`,
    pathname: request.path,
  };
}

function getCommonHeaders(request: IRequest): IHeaders {
  return {
    'Authorization': `Basic ${Buffer.from(`${request.apiKey}:x`).toString('base64')}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
}

interface IHeaders {
  [headerName: string]: string;
}
