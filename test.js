const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app'); // La aplicación Express

chai.use(chaiHttp);
const { expect } = chai;

describe('Pruebas para el registro de usuarios', () => {
  it('Debería registrar un nuevo usuario', (done) => {
    chai.request(app)
      .post('/users')
      .send({ names: 'Test', email: 'test@test.com', password: '123456', idRole: 1})
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').eql('Usuario registrado con éxito');
        done();
      });
  });

  it('Debería fallar al registrar un usuario con email inválido', (done) => {
    chai.request(app)
      .post('/users')
      .send({ names: 'Test', email: 'not-an-email', password: '123456', idRole: 1 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('errors');
        done();
      });
  });
});