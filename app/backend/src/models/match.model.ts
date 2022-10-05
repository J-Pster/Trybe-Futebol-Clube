import Match from '../database/models/Match';
import Team from '../database/models/Team';
import { IMatch, IMInput, IMScore } from '../interfaces/match.interface';

export default class UserModel {
  constructor(private _model: typeof Match = Match) {}

  public async findAll(): Promise<IMatch[] | null> {
    const result = await this._model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ]
    });
    return result;
  }

  public async findByPk(id: number): Promise<IMatch | null> {
    const result = await this._model.findByPk(id, {
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ]
    });
    return result;
  }

  public async findByProgress(progress: boolean): Promise<IMatch[] | null> {
    const result = await this._model.findAll({
      where: { progress },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ]
    });
    return result;
  };

  public async create(match: IMInput): Promise<IMatch> {
    const result = await this._model.create({
      ...match,
      inProgress: true,
    });
    return result;
  }

  public async finish(id: number): Promise<number> {
    const [result] = await this._model.update(
      { inProgress: false },
      { where: { id } }
    );
    return result;
  }

  public async updateScore(id: number, score: IMScore): Promise<number> {
    const [result] = await this._model.update(
      { ...score },
      { where: { id } }
    );
    return result;
  }
}