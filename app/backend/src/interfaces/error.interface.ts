export interface IError {
  code: string;
  message: string;
}

export class PError implements IError {
  constructor(public code: string, public message: string) {}
}