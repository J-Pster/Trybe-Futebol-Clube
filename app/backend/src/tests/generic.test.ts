import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import { app } from '../app';

chai.use(chaiHttp);
const { request, expect } = chai;

describe('Testando o Generic Controllers no /login', () => {
  it('deve retornar 405 no get em /login', async () => {
    const response = await request(app).get('/login')
    expect(response).to.have.status(405)
  })

  it('deve retornar 405 no put em /login', async () => {
    const response = await request(app).put('/login')
    expect(response).to.have.status(405)
  })

  it('deve retornar 405 no delete em /login', async () => {
    const response = await request(app).delete('/login')
    expect(response).to.have.status(405)
  })

  it('deve retornar 405 no post em /login/validate', async () => {
    const response = await request(app).post('/login/validate')
    expect(response).to.have.status(405)
  })

  it('deve retornar 405 no put em /login/validate', async () => {
    const response = await request(app).put('/login/validate')
    expect(response).to.have.status(405)
  })

  it('deve retornar 405 no delete em /login/validate', async () => {
    const response = await request(app).delete('/login/validate')
    expect(response).to.have.status(405)
  })
})