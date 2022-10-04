import { JwtPayload } from 'jsonwebtoken';

export interface IJwt extends JwtPayload {
  password: string;
  email: string;
}