import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/Team';

import { Response } from 'superagent';
import { teams, oneTeam } from './mocks/teams.mock';

chai.use(chaiHttp);

const { request, expect } = chai;

describe('Teste endpoint /teams', () => {
  describe('Listar todos os times', () => {
    before(async () => {
      sinon
        .stub(TeamsModel, "findAll")
        .resolves(teams as Array<TeamsModel>);
    });

    after(() => {
      (TeamsModel.findAll as sinon.SinonStub).restore();
    });

    it('deveria receber um array de objetos', async () => {
      const response = await request(app).get('/teams');

      expect(response).to.have.status(200);
      expect(response).to.be.json;
      expect(response.body).to.be.a('array');
      expect(response.body).to.eql(teams);
    });
  });

  describe('Listar apenas um time', () => {
    before(async () => {
      sinon
        .stub(TeamsModel, "findByPk")
        .resolves(oneTeam as TeamsModel);
    });

    after(() => {
      (TeamsModel.findByPk as sinon.SinonStub).restore();
    });

    it('deveria receber apenas um objeto', async () => {
      const response = await request(app).get('/teams/16');

      expect(response).to.have.status(200);
      expect(response).to.be.json;
      expect(response.body).to.be.a('object');
      expect(response.body).to.include({ id: 16, teamName: "São Paulo" });
    });
  });
});