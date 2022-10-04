import { RequestHandler } from 'express';
import { stat } from 'fs';
import { StatusCodes } from 'http-status-codes';

import { IUserLogin } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private _service: UserService = new UserService()) {}

  public login: RequestHandler = async (req, res, next) => {
    const user: IUserLogin = req.body;
    const result = await this._service.login(user);

    return res.status(StatusCodes.OK).json({ token: result });
  }

  public validate: RequestHandler = async (req, res, next) => {
    const token = req.headers.authorization as string;
    const result = await this._service.validate(token);

    return res.status(StatusCodes.OK).json({ role: result });
  }
}