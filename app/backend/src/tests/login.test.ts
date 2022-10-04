import * as chai from 'chai';

import { app } from '../app';
import User from '../database/models/User';
import { login, user } from './mocks/user.mock';

// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testando o endpoint de /login', () => {
  describe('Quando o usuário é válido', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
    })
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar 200 no post em /login com um token', async () => {
      const res = await request(app).post('/login').send(login.existUser);
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('token')
    })
  })

  describe('Com um email ou uma senha fora dos padrões', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves()
    })
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('ao tentar usar um email inválido retorna 400', async () => {
      const response = await request(app).post('/login').send(login.invalidEmail);
      expect(response).to.have.status(400)
      expect(response.body.message).to.eq('All fields must be filled')
    })

    it('ao tentar usar uma senha inválida retorna 400', async () => {
      const response = await request(app).post('/login').send(login.invalidPassword);
      expect(response).to.have.status(400)
      expect(response.body.message).to.eq('All fields must be filled')
    })
  })

  describe('Quando não é encontrado o email no DB', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves(null)
    })
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retornar 401 com uma mensagem de erro', async () => {
      const response = await request(app).post('/login').send(login.wrongEmail);
      expect(response).to.have.status(401)
      expect(response.body.message).to.eq('Incorrect email or password')
    })
  })

  describe('Quando o email é encontrado mas a senha está errada', () => {
    before(() => {
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
    })
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('deve retronar 401 com uma mensagem de erro', async () => {
      const response = await request(app).post('/login').send(login.wrongPassword);
      expect(response).to.have.status(401)
      expect(response.body.message).to.eq('Incorrect email or password')
    })
  })
});