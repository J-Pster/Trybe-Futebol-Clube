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

  public async findOne(id: string): Promise<ITeam> {
    const result = await this._model.findOne(Number(id));
    if (!result) throw new PError('auth', 'ID de Time Inválido');
    return result;
  }
}