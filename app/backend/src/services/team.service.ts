import TeamModel from '../models/team.model';
import { PError } from '../interfaces/error.interface';
import { ITeam } from '../interfaces/team.interface';

export default class TeamService {
  constructor(
    private _model: TeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ITeam[]> {
    const result = await this._model.findAll();
    if (!result) throw new PError('notFound', 'Nenhum time foi encontrado!');
    return result;
  }

  public async findOne(id: string): Promise<ITeam | null> {
    const result = await this._model.findOne(Number(id));
    return result;
  }

  public async findByName(name: string): Promise<ITeam | null> {
    const result = await this._model.findByName(name);
    return result;
  }
}