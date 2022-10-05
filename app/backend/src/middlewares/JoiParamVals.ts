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

  public validateId:RequestHandler = (req, _res, next): boolean | void => {
    const { id } = req.params;
    const idVal = Number(id);
    
    const schema = Joi.object({
      idVal: Joi.number().required(),
    });

    const { error } = schema.validate({ idVal });

    if (error) return next(new PError('badRequest', 'ID must be a valid ID'));

    next();
  }

  public validateMatchParams:RequestHandler = (req, _res, next): boolean | void => {
    const { inProgress } = req.query;
    // Caso seja um get sem inProgress
    if(!inProgress) return next();

    const progress = inProgress === 'true';

    const schema = Joi.object({
      progress: Joi.boolean().required(),
    });

    const { error } = schema.validate({ progress });

    if (error) return next(new PError('badRequest', 'inProgress must be a valid boolean'));

    next();
  }
}