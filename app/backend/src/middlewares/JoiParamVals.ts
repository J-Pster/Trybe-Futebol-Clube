import * as Joi from 'joi';
import { RequestHandler } from 'express';

import { PError } from '../interfaces/error.interface';
import JWT from './GenerateToken';

export default class JoiParamVals {
  constructor(private _jwt: JWT = new JWT()) {}

  public validateTokenExists:RequestHandler = (req, _res, next): boolean | void => {
    const token = req.headers.authorization;
    if(!token) return next(new PError('jwt', 'Token must be a valid token'));

    next();
  }

  public validateToken:RequestHandler = (req, _res, next): boolean | void => {
    const token = req.headers.authorization;
    if(!token) return next(new PError('jwt', 'Token must be a valid token'));

    const { data } = this._jwt.validate(token);
    console.log('DATA: ', data);
    
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