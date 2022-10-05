import * as Joi from 'joi';
import { RequestHandler } from 'express';

import MatchService from '../services/match.service';
import { PError } from '../interfaces/error.interface';

export default class JoiBodyVals {
  constructor() {}

  public validateUser:RequestHandler = (req, _res, next): boolean | void => {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().min(3).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ email, password });

    if(error) {
      next(new PError('badRequest', 'All fields must be filled'))
      return false;
    }

    return next();
  }

  public validateMatchBody:RequestHandler = (req, _res, next): boolean | void => {
    const match = req.body;

    const schema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
    });

    const { error } = schema.validate(match);

    if (error) return next(new PError('badRequest', 'Match must be a valid match'));

    next();
  }

  public validateTeamIds:RequestHandler = (req, _res, next): boolean | void => {
    const matchService = new MatchService();
    const {homeTeam, awayTeam} = req.body;
    const teamIds = [homeTeam, awayTeam];

    if(homeTeam === awayTeam) return next(new PError('auth', 'It is not possible to create a match with two equal teams'));

    teamIds.forEach((teamId) => {
      const result = matchService.findById(teamId);
      if(!result) return next(new PError('notFound', 'There is no team with such id!'));
    })

    next();
  }
}