import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Response, Request} from './interfaces';
import {get, omit} from 'lodash';

@Injectable()
export class RequestGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        this.bindRequestHelpers(context.switchToHttp().getRequest());
        this.bindResponseHelpers(context.switchToHttp().getResponse());

        return true;
    }

    bindResponseHelpers(response: Response): unknown {
        const success = function (
            data: Record<string, unknown> | Array<unknown> | string,
            status = 200,
        ) {
            return response.status(status).json({
                success: true,
                code: status,
                data,
            });
        };

        const error = function (error: Record<string, unknown> | string, status = 401) {
            let message = 'Something went wrong!';
            let errors = null;

            if (error instanceof Object) {
                message = error.message as string;
                errors = error.errors;
            } else {
                message = error;
            }

            return response.status(status).json({
                success: false,
                code: status,
                message: message,
                errors,
            });
        };

        const noContent = function () {
            return response.status(204).end();
        };

        const withMeta = function (data: Record<string, unknown>, status = 200) {
            return response.status(status).json({
                success: true,
                code: status,
                data: get(data, 'data'),
                meta: omit(data, ['data']),
            });
        };

        response.success = success;
        response.error = error;
        response.noContent = noContent;
        response.withMeta = withMeta;

        return response;
    }

    bindRequestHelpers(request: Request): unknown {
        const all = function (): Record<string, unknown> {
            const inputs = {...request.query, ...request.body, ...request.params};

            for (const key in inputs) {
                const value = inputs[key];

                if (typeof value === 'string' || value instanceof String) {
                    inputs[key] = value.trim();
                }
            }

            return inputs;
        };

        request.all = all;
        return request;
    }
}
