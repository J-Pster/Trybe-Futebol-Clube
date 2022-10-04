import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import User from '../database/models/User';
import { login, user } from './mocks/user.mock';

// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testando o endpoint de /login/validate', () => {
  
  describe('Quando nenhum token é enviado', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves()
      Sinon.stub(jwt, 'verify').resolves()
    })
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('deve retonar 401 com uma mensagem de erro', async () => {
      const response = await request(app).get('/login/validate').send();
      expect(response).to.have.status(401)
      expect(response.body).to.eql({ message: 'Token must be a valid token' })
    })
  })

  describe('Quando um token válido é enviado', () => {
    before(() => {
      Sinon.stub(jwt, 'verify').returns({ data: login.existUser} as any)
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar 200 com o cargo do usuário no body', async () => {
      const response = await request(app)
      .get('/login/validate')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send();

      expect(response).to.have.status(200)
      expect(response.body).to.eql({role: user.validUser.role})

    })
  })

  describe('Quando um token é enviado mas o usuário não é encontrado', () => {
    before(() => {
      Sinon.stub(jwt, 'verify').returns({ data: login.existUser} as any)
      Sinon.stub(User, 'findOne').resolves(null)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar 401 com uma mensagem de erro', async () => {
      const response = await request(app)
      .get('/login/validate')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send();

      expect(response).to.have.status(401)
      expect(response.body).to.eql({ message: 'Incorrect email or password' })

    })
  })
});