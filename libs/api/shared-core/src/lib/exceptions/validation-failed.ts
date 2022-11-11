import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidationFailed extends HttpException {
  private readonly errors: Record<string, unknown>;

  constructor(errors: Record<string, unknown>) {
    super('Some entities failed, please check', HttpStatus.UNPROCESSABLE_ENTITY);
    this.errors = errors;
  }

  getErrors(): Record<string, unknown> {
    return this.errors;
  }


}