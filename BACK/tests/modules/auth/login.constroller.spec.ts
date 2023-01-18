import supertest from 'supertest';
import app from '../../../src/app';

describe('Login Controller', () => {
  it('POST /login success', async () => {
    const result = await supertest(app)
      .post('/login')
      .send({ login: 'letscode', senha: 'lets@123' });
    expect(result.statusCode).toEqual(200);
  });

  it('POST /login unauthorized', async () => {
    const result = await supertest(app)
      .post('/login')
      .send({ login: 'fakelogin', senha: 'fakepass' });
    expect(result.statusCode).toEqual(401);
  });
});
