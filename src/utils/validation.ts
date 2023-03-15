import Joi from "joi";
import { usersDetails } from "./type";

export const registerValidate = (register: usersDetails) => {
  const registerSchema = Joi.object({
    name: Joi.string().required().message(`Enter your name`),
    email: Joi.string().email().required().message(`Check your email`),
    password: Joi.string().max(30).min(6).required().message(``),
    phone: Joi.number().required(),
  });
  return registerSchema.validate(register);
};
