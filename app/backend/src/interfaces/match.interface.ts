// O Score Básico

export interface IMScore {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

// O Input de dados
export interface IMInput extends IMScore{
  homeTeam: number | string;
  awayTeam: number | string;
}

// A partida em sí, que tem o score e o input completinho
export interface IMatch extends IMInput {
  id: number;
  inProgress: boolean
  teamHome: {
    teamName: string
  };
  teamAway: {
    teamName: string
  }
}