import { RequestHandler } from 'express';
import { PError } from '../interfaces/error.interface';

export default class JoiParamVals {
  constructor() {}

  public validateToken:RequestHandler = (req, _res, next): boolean | void => {
    const token = req.headers.authorization;
    if(!token) return next(new PError('jwt', 'Token must be a valid token'));
    next();
  }
}