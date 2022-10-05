import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IMInput, IMScore } from '../interfaces/match.interface';
import MatchService from '../services/match.service';

export default class MatchController {
  constructor(private _service: MatchService = new MatchService()) {}

  public findAll: RequestHandler = async (req, res, _next) => {
    const { inProgress } = req.query;
    
    // Tratando o caso de ter um Query
    if(inProgress) {
      const progress = inProgress === 'true';
      const result = await this._service.findByProgress(progress);

      return res.status(StatusCodes.OK).json(result);
    }

    const result = await this._service.findAll();
    return res.status(StatusCodes.OK).json(result);
  }

  public findById: RequestHandler = async (req, res, _next) => {
    const { id } = req.params;
    const result = await this._service.findById(Number(id));

    return res.status(StatusCodes.OK).json(result);
  }

  public create: RequestHandler = async (req, res, _next) => {
    const match: IMInput = req.body;
    const result = await this._service.create(match);

    return res.status(StatusCodes.CREATED).json(result);
  }

  public finish: RequestHandler = async (req, res, _next) => {
    const { id } = req.params;
    const result = await this._service.finish(Number(id));

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }

  public updateScore: RequestHandler = async (req, res, _next) => {
    const { id } = req.params;
    const score: IMScore = req.body;
    const result = await this._service.updateScore(Number(id), score);

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  }
}