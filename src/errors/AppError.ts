import { StatusCodes } from "http-status-codes";

class AppError {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
  static badRequest(msg: string) {
    return new AppError(StatusCodes.BAD_REQUEST, msg);
  }
  static internal(msg: string) {
    return new AppError(StatusCodes.INTERNAL_SERVER_ERROR, msg);
  }
}

export = AppError;
