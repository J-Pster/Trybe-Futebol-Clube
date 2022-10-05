import { PError } from '../interfaces/error.interface';
import { IMatch, IMInput, IMScore } from '../interfaces/match.interface';
import MatchModel from '../models/match.model';
import TeamModel from '../models/team.model';

export default class TeamService {
  constructor(
    private _matchModel: MatchModel = new MatchModel(),
    private _teamModel: TeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<IMatch[]> {
    const result = await this._matchModel.findAll();
    if (!result) throw new PError('notFound', 'Nenhum jogo foi encontrado!');
    return result;
  }

  public async findById(id: number): Promise<IMatch | null> {
    const result = await this._matchModel.findByPk(id);
    return result;
  }

  public async findByProgress(progress: boolean): Promise<IMatch[]> {
    const result = await this._matchModel.findByProgress(progress);
    if (!result) throw new PError('notFound', 'Nenhum jogo foi encontrado!');
    return result;
  }

  public async create(match: IMInput): Promise<IMatch> {
    const result = await this._matchModel.create(match);
    return result;
  }

  public async finish(id: number): Promise<number> {
    const result = await this._matchModel.finish(id);
    if(result !== 1) throw new PError('notFound', 'Nenhum jogo foi encontrado!');
    return result;
  }

  public async updateScore(id: number, score: IMScore): Promise<number> {
    const result = await this._matchModel.updateScore(id, score);
    if(result !== 1) throw new PError('notFound', 'Nenhum jogo foi encontrado!');
    return result;
  }
}