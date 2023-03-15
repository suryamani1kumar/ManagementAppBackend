import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";

export const notFound = (req: Request, res: Response) => {
  res
    .status(StatusCodes.BAD_REQUEST)
    .json({ msg: `please check route`, status: StatusCodes.NOT_FOUND });
};
