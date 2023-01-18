import supertest from 'supertest';
import app from '../../../src/app';

const successCardAdd = {
  titulo: 'Titulo 1',
  conteudo: 'Conteudo 1',
  lista: 'lista-1',
};

const successCard = {
  id: 1,
  titulo: 'Titulo 1',
  conteudo: 'Conteudo 1',
  lista: 'lista-2',
};

const invalidCardId = {
  id: 999,
  titulo: 'Titulo 1',
  conteudo: 'Conteudo 1',
  lista: 'lista-1',
};

describe('Update Card Controller', () => {
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

  it('PUT /cards/1 unauthorized', async () => {
    const result = await server.put('/cards/1').send(successCard);
    expect(result.statusCode).toEqual(401);
  });

  it('PUT /cards/999 not found', async () => {
    const result = await server
      .put('/cards/999')
      .set('Authorization', token)
      .send(invalidCardId);
    expect(result.statusCode).toEqual(404);
  });

  it('PUT /card/2 bad id', async () => {
    const result = await server
      .put('/cards/2')
      .set('Authorization', token)
      .send(successCard);
    expect(result.statusCode).toEqual(400);
  });

  it('PUT /cards/1 success', async () => {
    const result = await server
      .put('/cards/1')
      .set('Authorization', token)
      .send(successCard);
    expect(result.statusCode).toEqual(200);
    expect(result.body.lista).toEqual('lista-2');
  });
});
