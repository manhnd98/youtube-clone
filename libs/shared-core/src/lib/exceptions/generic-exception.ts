import {HttpException} from '@nestjs/common';
import {nullish} from '../utils';

export class GenericException extends HttpException {
    constructor(message?: string, code?: number) {
        message = nullish(message, 'Something went wrong!');
        code = nullish(code, 400);
        super(message, code);
    }
}
