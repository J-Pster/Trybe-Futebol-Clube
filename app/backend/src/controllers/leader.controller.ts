import { RequestHandler } from 'express';
import LeaderboardService from '../services/leader.service';

export default class LeaderboardController {
  constructor(private service: LeaderboardService = new LeaderboardService()) {}

  getAway: RequestHandler = async (_req, res, _next) => {
    const result = await this.service.getAway();
    return res.status(200).json(result);
  };

  getHome: RequestHandler = async (_req, res, _next) => {
    const result = await this.service.getHome();
    return res.status(200).json(result);
  };

  getAll: RequestHandler = async (_req, res, _next) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };
}