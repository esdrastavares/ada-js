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
  });

  it('DELETE /cards/1 unauthorized', async () => {
    const result = await server.delete('/cards/1');
    expect(result.statusCode).toEqual(401);
  });

  it('DELETE /cards/2 not found', async () => {
    const result = await server.delete('/cards/2').set('Authorization', token);
    expect(result.statusCode).toEqual(404);
  });

  it('DELETE /cards/1 success', async () => {
    const result = await server.delete('/cards/1').set('Authorization', token);
    expect(result.statusCode).toEqual(200);
  });
});
