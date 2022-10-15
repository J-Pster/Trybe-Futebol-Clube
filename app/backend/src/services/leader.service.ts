import { ILeader, TeamGoals } from "../interfaces/leader.interface";
import { IMatch } from "../interfaces/match.interface";
import MatchModel from "../models/match.model";

// import CustomError from '../middlewares/CustomError';

export default class LeaderboardService {
  constructor(private model: MatchModel = new MatchModel()) {}

  async getAway() {
    const games = (await this.model.findAll()) as IMatch[];
    const awayGames = LeaderboardService.generetaAwayGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames(awayGames);
    return accumulatedGames;
  }

  async getHome() {
    const games = (await this.model.findAll()) as IMatch[];
    const homeGames = LeaderboardService.generateHomeGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames(homeGames);
    return accumulatedGames;
  }

  async getAll() {
    const games = (await this.model.findAll()) as IMatch[];
    const awayGames = LeaderboardService.generetaAwayGames(games);
    const homeGames = LeaderboardService.generateHomeGames(games);
    const accumulatedGames = LeaderboardService.accumulateGames([...awayGames, ...homeGames]);
    return accumulatedGames;
  }

  // Funções Auxiliares

  // Essa função foi criada, pois a .toFixed retorna uma string.
  private static toFixedNumber(num: number, digits: number, base: number) {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
  }

  private static calculateEfficiency(game: ILeader): number {
    return LeaderboardService.toFixedNumber(((game.totalPoints / (game.totalGames * 3)) * 100), 2, 10);
  }

  private static generateScore(
    game: IMatch,
    teamOne: TeamGoals,
    teamTwo: TeamGoals
  ) {
    let score = { point: 0, tye: 0, loss: 0, win: 0 };

    if (game[teamOne] === game[teamTwo]) {
      score = { ...score, point: 1, tye: 1 };
    } else if (game[teamOne] > game[teamTwo]) {
      score = { ...score, point: 3, win: 1 };
    } else {
      score = { ...score, loss: 1 };
    }

    return score;
  }

  private static genereteGames(games: IMatch[], teamOne: TeamGoals, teamTwo: TeamGoals) {
    const actualTeam = teamOne === "homeTeamGoals" ? "teamHome" : "teamAway";

    return games
      .filter((game) => !game.inProgress)
      .map((game) => {
        const { point, loss, tye, win } = LeaderboardService.generateScore(game, teamOne, teamTwo);

        return {
          name: game[actualTeam].teamName,
          totalPoints: point,
          totalVictories: win,
          totalDraws: tye,
          totalLosses: loss,
          goalsFavor: game[teamOne],
          goalsOwn: game[teamTwo],
        } as ILeader;
      });
  }

  private static sortGames(games: ILeader[]) {
    return games
      .sort(
        (a, b) =>
          b.totalPoints - a.totalPoints ||
          b.totalVictories - a.totalVictories ||
          b.goalsBalance - a.goalsBalance ||
          b.goalsFavor - a.goalsFavor ||
          a.goalsOwn - b.goalsOwn
      );
  }

  private static addBalanceAndEfficiency(games: ILeader[]) {
    return games
      .map((game) => ({
        ...game,
        goalsBalance: game.goalsFavor - game.goalsOwn,
        efficiency: LeaderboardService.calculateEfficiency(game),
      }))
  }

  // Funções principais

  private static accumulateGames(games: ILeader[]) {
    const leaderBoard = [] as ILeader[];

    games.forEach((game) => {
        const { name, totalPoints, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn } = game;

        // Pega o index se o jogo já tiver no array
        const index = leaderBoard.findIndex((accGame) => accGame.name === name);
        // Se não tiver, a func de cima vai retornar -1 e ai ele cria esse jogo na tabela acumulada
        if (index === -1) return leaderBoard.push({ ...game, totalGames: 1 });

        leaderBoard[index].totalPoints += totalPoints;
        leaderBoard[index].totalVictories += totalVictories;
        leaderBoard[index].totalDraws += totalDraws;
        leaderBoard[index].totalLosses += totalLosses;
        leaderBoard[index].goalsFavor += goalsFavor;
        leaderBoard[index].goalsOwn += goalsOwn;
        leaderBoard[index].totalGames += 1;
      }
    );

    const finalLeader = LeaderboardService.addBalanceAndEfficiency(leaderBoard);
    const sortedLeader = LeaderboardService.sortGames(finalLeader);

    return sortedLeader;
  }

  private static generetaAwayGames(games: IMatch[]) {
    return LeaderboardService.genereteGames(games, "awayTeamGoals", "homeTeamGoals");
  }

  private static generateHomeGames(games: IMatch[]) {
    return LeaderboardService.genereteGames(games, "homeTeamGoals", "awayTeamGoals");
  }
}
