import Team from '../database/models/Team';
import { ITeam } from '../interfaces/team.interface';

export default class TeamModel {
  constructor(private _model: typeof Team = Team) {}

  public async findAll(): Promise<ITeam[] | null> {
    const result = await this._model.findAll();
    return result;
  }

  public async findOne(id: number): Promise<ITeam | null> {
    const result = await this._model.findByPk(id);
    return result;
  }

  public async findByName(name: string): Promise<ITeam | null> {
    const result = await this._model.findOne({ where: { teamName: name } });
    return result;
  }
}