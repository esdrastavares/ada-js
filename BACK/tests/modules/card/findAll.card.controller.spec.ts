import supertest from 'supertest';
import app from '../../../src/app';

const successCardAdd = {
  titulo: 'Titulo 1',
  conteudo: 'Conteudo 1',
  lista: 'lista-1',
};

describe('Delete Card Controller', () => {
  let token: string;
  const server = supertest(app);

  beforeAll(async () => {
    const result = await server
      .post('/login')
      .send({ login: 'letscode', senha: 'lets@123' });
    token = `Bearer ${result.body.accessToken}`;
    await server
      .post('/cards')
      .set('Authorization', token)
      .send(successCardAdd);
    await server
      .post('/cards')
      .set('Authorization', token)
      .send(successCardAdd);
  });

  it('GET /cards unauthorized', async () => {
    const result = await server.get('/cards');
    expect(result.statusCode).toEqual(401);
  });

  it('GET /cards success', async () => {
    const result = await server.get('/cards').set('Authorization', token);
    expect(result.statusCode).toEqual(200);
    expect(result.body.length).toEqual(2);
  });
});
