import * as Joi from 'joi';
import { RequestHandler } from 'express';
import { PError } from '../interfaces/error.interface';

export default class JoiBodyVals {
  constructor() {}

  public validateUser:RequestHandler = (req, _res, next): boolean | void => {
    const { email, password } = req.body;
    console.log(`Validando ${email}`)

    const schema = Joi.object({
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ email, password });

    if(error) {
      next(new PError('badRequest', 'All fields must be filled'))
      return false;
    }

    return next();
  }
}