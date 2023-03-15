import { Response, Request, NextFunction } from 'express';
import user from '../Schema/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
// import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../middleware/logger';
// import { asyncWarapper } from '../utils/asyncWarpper';

const userController = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const findUser = await user.findOne({ email: email });

    if (findUser) {
      return res.status(200).json({ msg: `User Already exit` });
    }

    const usersDetails = new user({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    await usersDetails.save();

    res.status(StatusCodes.OK).json({ msg: `Registration success completed` });
  } catch (error: any) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: 'Internal Server Error' });
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const findUser = await user.findOne({ email: email });

    if (!findUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: StatusCodes.NOT_FOUND, msg: `User is not found` });
    }

    const matchPassword = await bcrypt.compare(password, findUser.password);

    if (!matchPassword) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ status: StatusCodes.NOT_FOUND, msg: `Enter correct Password` });
    }

    const token = jwt.sign(
      { email, password },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '2d',
        algorithm: 'HS256',
      }
    );
    logger.info('token', token);
    // console.log(token);

    return res
      .status(StatusCodes.OK)
      .json({ status: StatusCodes.OK, msg: token });
  } catch (error: any) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: 'Internal Server Error' });
  }
};

//  const loginController: any = asyncWarapper(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { email, password } = req.body;

//     const findUser = await user.findOne({ email: email });
//     console.log(findUser);

//     if (!findUser) {
//       throw new Error(`please register`);
//       // next(AppError.badRequest(`please register`));
//     }
//     return res.status(StatusCodes.BAD_REQUEST).json(`dssd`);
//   }
// );

export = { userController, loginController };
