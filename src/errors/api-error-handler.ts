import AppError from "./AppError";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const apiErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err instanceof AppError) {
  //   res.status(err.code).json(err.message);
  //   return;
  // }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Something went wrong ,try again later ` });
};
