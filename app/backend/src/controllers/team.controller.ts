import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private _service: TeamService = new TeamService()) {}

  public findAll: RequestHandler = async (_req, res, _next) => {
    const result = await this._service.findAll();
    return res.status(StatusCodes.OK).json(result);
  }

  public findOne: RequestHandler = async (req, res, _next) => {
    const { id } = req.params;
    const result = await this._service.findOne(id);
    return res.status(StatusCodes.OK).json(result);
  }
}