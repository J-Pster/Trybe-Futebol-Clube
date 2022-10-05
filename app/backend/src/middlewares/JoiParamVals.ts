import * as Joi from 'joi';
import { RequestHandler } from 'express';

import { PError } from '../interfaces/error.interface';

export default class JoiParamVals {
  constructor() {}

  public validateToken:RequestHandler = (req, _res, next): boolean | void => {
    const token = req.headers.authorization;
    if(!token) return next(new PError('jwt', 'Token must be a valid token'));
    next();
  }

  public validateTeamId:RequestHandler = (req, _res, next): boolean | void => {
    const { id } = req.params;
    
    const schema = Joi.object({
      id: Joi.number().required(),
    });

    const { error } = schema.validate({ id });

    if (error) return next(new PError('badRequest', 'ID must be a valid ID'));

    next();
  }
}