import {Injectable} from '@nestjs/common';
import {
    CallHandler,
    ExecutionContext,
    NestInterceptor,
    RequestTimeoutException,
} from '@nestjs/common';
import {catchError, timeout} from 'rxjs/operators';
import {Observable, throwError, TimeoutError} from 'rxjs';

const FIVE_SECOND = 1000 * 5;

// Strict rule for each request maximum time is 5 second
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            timeout(FIVE_SECOND),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(new RequestTimeoutException());
                }

                return throwError(err);
            }),
        );
    }
}
