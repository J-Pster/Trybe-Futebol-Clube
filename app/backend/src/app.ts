import * as express from 'express';

import { errNotJoi } from './middlewares/genericErrors';
import LoginRoute from './routers/login.route'
import TeamRoute from './routers/team.route'
import MatchRoute from './routers/match.route'
import LeaderRoute from './routers/leader.route'

// Feito por Pster

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (_req, res) => res.json({ ok: true }));

    // Routes
    this.app.use('/login', LoginRoute)
    this.app.use('/teams', TeamRoute)
    this.app.use('/matches', MatchRoute)
    this.app.use('/leaderboard', LeaderRoute)

    // Error Middlwares
    // this.app.use(errJoi);
    this.app.use(errNotJoi);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
