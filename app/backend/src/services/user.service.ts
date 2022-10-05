import { compareSync } from 'bcryptjs';
import JWT from '../middlewares/GenerateToken';

import { IUserLogin } from '../interfaces/user.interface';
import { PError } from '../interfaces/error.interface';

import UserModel from '../models/user.model';

export default class UserService {
  constructor(
    private _model: UserModel = new UserModel(),
    private _jwtInst: JWT = new JWT()
  ) {}

  public async login(user: IUserLogin): Promise<string> {
    const validUser = await this._model.findOne(user.email);
    if(!validUser) throw new PError('jwt', 'Incorrect email or password');

    const validPass = compareSync(user.password, validUser.password)
    if(!validPass) throw new PError('jwt', 'Incorrect email or password');
;
    return this._jwtInst.create(user);
  }

  public async validate(token: string): Promise<string> {
    const {email} = this._jwtInst.validate(token);
  
    const validUser = await this._model.findOne(email);
    if(!validUser) throw new PError('jwt', 'Incorrect email or password');

    return validUser.role;
  }
}