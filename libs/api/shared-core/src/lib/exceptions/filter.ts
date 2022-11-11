import {
    ArgumentsHost,
    Catch,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';
import {ValidationFailed} from './validation-failed';
import {InvalidCredentials} from './invalid-credentials';
import {GenericException} from './generic-exception';
import {Unauthorized} from './unauthorized';
import {Response} from '../rest';
import {nullish} from '../utils';

@Catch()
export class ExceptionFilter extends BaseExceptionFilter {
    doNotReport(): Array<any> {
        return [
            NotFoundException,
            ValidationFailed,
            InvalidCredentials,
            GenericException,
            Unauthorized,
            UnauthorizedException,
        ];
    }

    catch(exception: any, host: ArgumentsHost) {
        console.error('ERRR ==>', exception);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse() as Response;

        if (exception instanceof ValidationFailed) {
            return response.error(
                {
                    message: exception.message,
                    errors: exception.getErrors(),
                },
                exception.getStatus(),
            );
        }

        let message = exception.message || 'Something went wrong. Please try again later';

        const status = nullish(exception.status, 500);

        message = exception.status ? message : 'Internal Server Error';

        return response.status(status).json({
            success: false,
            code: status,
            message,
        });
    }
}
