import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');

import { app } from '../app';
import Match from '../database/models/Match';

import { awayLeaderboard, homeLeaderboard, leaderBoard } from './mocks/leader.mock';
import {matches} from './mocks/match.mock'


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testa o endpoint de /leaderboard', () => {
  describe('Ao fazer GET em /leaderboard', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar 200 com os times corretos', async () => {
      const response = await request(app).get('/leaderboard').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(leaderBoard)
    })
  })

  describe('Ao fazer GET em /leaderboard/away', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar 200 com os times away corretamente', async () => {
      const response = await request(app).get('/leaderboard/away').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(awayLeaderboard)
    })
  })

  describe('Ao fazer GET em /leaderboard/home', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar 200 com os times home corretamente', async () => {
      const response = await request(app).get('/leaderboard/home').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(homeLeaderboard)
    })
  })
})