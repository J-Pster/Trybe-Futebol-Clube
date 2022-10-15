import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');

import { app } from '../app';
import Match from '../database/models/Match';

import { login } from './mocks/user.mock';
import { matches, matchesInProgress, matchResCreate, matchReqCreate, matchReqCreateString, matchReqPatch } from './mocks/match.mock';


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testando o endpoint de /matches', () => {
  describe('Ao fazer GET em /matches', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar corretamente as matches', async () => {
      const response = await request(app).get('/matches').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(matches)
    })
  })

  describe('Ao fazer GET em /matches?inProgress=true', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matchesInProgress as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Deve retornar corretamente as matches?inProgress=true', async () => {
      const response = await request(app).get('/matches?inProgress=true').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(matchesInProgress)
    })
  })

  describe('Ao fazer POST em /matches com usuário válido', () => {
    before(() => {
      Sinon.stub(Match, 'create').resolves(matchResCreate as Match)
      Sinon.stub(jwt, 'verify').returns({ data: login.existUser} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });

    it('Deve retornar 201 com a partida criada', async () => {
      const response = await request(app)
      .post('/matches')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send(matchReqCreate);
      expect(response).to.have.status(201)
      expect(response.body).to.eql(matchResCreate)
    })

    it('Deve retornar 201 com a partida criada', async () => {
      const response = await request(app)
      .post('/matches')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send(matchReqCreateString);
      expect(response).to.have.status(201)
      expect(response.body).to.eql(matchResCreate)
    })
  })

  describe('Ao fazer POST em /matches com usuário inválido', () => {
    before(() => {
      Sinon.stub(jwt, 'verify').resolves()
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Deve retornar 401 com mensagem de erro', async () => {
      const response = await request(app)
      .post('/matches')
      .set('Authorization', '')
      .send(matchReqCreate);
      expect(response).to.have.status(401)
      expect(response.body).to.eql({ message: 'Token must be a valid token' })
    })
  })

  describe('Ao fazer PATCH /matches/:id/finish com dados válidos', () => {
    before(() => {
      Sinon.stub(Match, 'update').resolves([1] as any)
      Sinon.stub(jwt, 'verify').returns({ data: login.existAdmin} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Deve retornar 201 com a mensagem de sucesso!', async () => {
      const response = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send();
      expect(response).to.have.status(200)
      expect(response.body.message).to.eql('Finished')
    })
  })

  describe('Ao fazer PATCH /matches/:id/finish sem um token!', () => {
    it('Deve retornar 401 com erro se não enviar um token!', async () => {
      const response = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', '')
      .send();
      expect(response).to.have.status(401)
      expect(response.body).to.eql({ message: 'Token must be a valid token' })
    })
  })

  describe('Ao fazer PATCH /matches/:id/finish com um ID inválido!', () => {
    before(() => {
      Sinon.stub(jwt, 'verify').returns({ data: login.existAdmin} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('Deve retornar 400 com erro se não enviar um id válido!', async () => {
      const response = await request(app)
      .patch('/matches/asd/finish')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send();
      expect(response).to.have.status(400)
      expect(response.body).to.eql({ message: 'ID must be a valid ID' })
    })
  })

  describe('Ao fazer PATCH /matches/:id com dados válidos', () => {
    before(() => {
      Sinon.stub(Match, 'update').resolves([1] as any)
      Sinon.stub(jwt, 'verify').returns({ data: login.existAdmin} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });

    it('Deve retornar 201 com a mensagem de sucesso!', async () => {
      const response = await request(app)
      .patch('/matches/1')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send(matchReqPatch);
      expect(response).to.have.status(200)
      expect(response.body.message).to.eql('Finished')
    })
  })

})