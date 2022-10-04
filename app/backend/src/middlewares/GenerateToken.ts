import * as jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwt.interface';

export default class JWT {
  private _secret: string = process.env.JWT_SECRET as string;

  constructor() {
  }

  public create(data: IJwt): string {
    return jwt.sign({data}, this._secret);
  }

  public validate(token: string): IJwt {
    const { data } = jwt.verify(token, this._secret) as { data: IJwt };
    return data;
  }
}