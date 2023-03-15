import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const paginatedResult = (model: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { pageNumber, limit } = req.query;

    const page: number = parseInt(pageNumber as any) || 0;
    const limits: number = parseInt(limit as any) || 1;

    // calculating the starting and ending index
    const startIndex = (page - 1) * limits;
    // const endIndex = page * limits;
    try {
      const getData = await model.find().limit(limits).skip(startIndex);

      res.status(StatusCodes.OK).json({ data: getData });
      //   res.paginatedResult = getData;
      next();
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `INTERNAL_SERVER_ERROR`,
      });
    }
  };
};
