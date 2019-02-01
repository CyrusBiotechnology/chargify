import {ChargifyId, IChargifyAdjustment} from '../interfaces';
import {ChargifyApiError} from '../error';
import {post} from '../request';

export interface ICreateAdjustmentRequest {
  subscriptionId: ChargifyId;
  amount: number;
  memo: string; // max length 255
}

export interface ICreateAdjustmentResponse {
  error: ChargifyApiError | null;
  adjustment: IChargifyAdjustment | null;
}

interface IChargifyCreateAdjustmentRequestBody {
  adjustment: {
    amount: number;
    memo: string;
  }
}

interface IChargifyCreateAdjustmentResponseBody {
  adjustment: IChargifyAdjustment;
}

export function createAdjustment(subdomain: string, apiKey: string) {
  return async (request: ICreateAdjustmentRequest): Promise<ICreateAdjustmentResponse> => {
    const response = await post<IChargifyCreateAdjustmentRequestBody, IChargifyCreateAdjustmentResponseBody>({
      path: `/subscriptions/${request.subscriptionId}/adjustments.json`,
      subdomain,
      apiKey,
      body: {
        adjustment: {
          amount: request.amount,
          memo: request.memo,
        }
      },
    });
    if (!response.ok) {
      return {
        error: new ChargifyApiError(response.status, 'Failed to create adjustment'),
        adjustment: null,
      };
    }
    const rawAdjustment = await response.json();
    const adjustment = rawAdjustment.adjustment;
    return {
      error: null,
      adjustment,
    };
  }
}
