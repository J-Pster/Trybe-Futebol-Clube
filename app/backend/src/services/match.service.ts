import { PError } from '../interfaces/error.interface';
import { IMatch, IMInput, IMScore } from '../interfaces/match.interface';
import { ITeam } from '../interfaces/team.interface';
import MatchModel from '../models/match.model';
import TeamService from '../services/team.service';

export default class MatchService {
  constructor(
    private _matchModel: MatchModel = new MatchModel(),
    private _teamService: TeamService = new TeamService(),
  ) {}

  public async findAll(): Promise<IMatch[]> {
    const result = await this._matchModel.findAll();
    if (!result) throw new PError('notFound', 'Nenhum jogo foi encontrado!');
    return result;
  }

  public async findOne(name: string): Promise<IMatch | null> {
    const result = await this._matchModel.findOne(name);
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

  public async create(matchWithNames: IMInput): Promise<IMatch> {
    const { homeTeam, awayTeam } = matchWithNames;
    const teamNames = [homeTeam, awayTeam];

    const promissesTeams = teamNames.map(async (teamName) => {
      let result;
      if(typeof teamName === 'string') {
        result = await this._teamService.findByName(teamName) as ITeam;
      } else {
        result = await this._teamService.findOne(teamName.toString()) as ITeam;
      }
      return result;
    });

    const teams = await Promise.all(promissesTeams);

    const match: IMInput = {
      ...matchWithNames,
      homeTeam: teams[0].id,
      awayTeam: teams[1].id,
    }

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