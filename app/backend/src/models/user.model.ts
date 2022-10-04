import User from '../database/models/User';
import { IUser } from '../interfaces/user.interface';

export default class UserModel {
  constructor(private _model: typeof User = User) {}

  public async findOne(email: string): Promise<IUser | null> {
    const result = await this._model.findOne({ where: { email } });
    return result;
  }
}