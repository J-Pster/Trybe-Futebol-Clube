import * as Joi from 'joi';
import { RequestHandler } from 'express';

import MatchService from '../services/match.service';
import TeamService from '../services/team.service';
import { PError } from '../interfaces/error.interface';

export default class JoiBodyVals {
  constructor(
    private _matchService: MatchService = new MatchService(),
    private _teamService: TeamService = new TeamService(),
    ) {}

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
    console.log('A MATCH: ', match);

    const schema = Joi.object({
      homeTeam: Joi.alternatives(Joi.string(), Joi.number()).required(),
      awayTeam: Joi.alternatives(Joi.string(), Joi.number()).required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean(),
    });

    const { error } = schema.validate(match);
    console.log('ERROR: ', error);

    if (error) return next(new PError('badRequest', 'Match must be a valid match'));

    next();
  }

  public validateTeamIds:RequestHandler = async (req, _res, next): Promise<boolean | void> => {
    const {homeTeam, awayTeam} = req.body;
    const teamNames = [homeTeam, awayTeam];

    if(homeTeam === awayTeam) return next(new PError('auth', 'It is not possible to create a match with two equal teams'));
    console.log('TEAM NAMES: ', teamNames);

    const promissesTeams = teamNames.map(async (teamName) => {
      let result;
      if(typeof teamName === 'string') {
        result = await this._teamService.findByName(teamName);
      } else {
        result = await this._teamService.findOne(teamName.toString());
      }
      if(!result) return next(new PError('notFound', 'There is no team with such id!'));
    });

    await Promise.all(promissesTeams);
    
    next();
  }
}