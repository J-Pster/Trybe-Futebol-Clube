import { RequestHandler } from 'express';

const notAllowed: RequestHandler = (_req, res, next) => res.status(405).json();

export default {
  notAllowed,
};