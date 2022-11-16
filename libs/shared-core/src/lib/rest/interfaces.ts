import {Request as BaseRequest} from 'express';
import {Response as BaseResponse} from 'express';

export interface Request extends BaseRequest {
    /**
     * Get all inputs from the request object
     */
    all(): Record<string, unknown>;

    /**
     * Get current user from the request object
     */
    user: Record<string, unknown>;
}

export interface Response extends BaseResponse {
    success(
        data: Record<string, unknown> | Array<unknown> | string,
        status?: number | string,
    ): unknown;

    error(error: Record<string, unknown> | string, status?: number | string): unknown;

    noContent(): unknown;

    withMeta(data: Record<string, unknown>, status?: number | string): unknown;
}
