import supertest from 'supertest';
import app from '../../../src/app';

const successCard = {
  titulo: 'Titulo 1',
  conteudo: 'Conteudo 1',
  lista: 'lista-1',
};

const invalidCard = {
  titulo: '',
  conteudo: 'Conteudo 1',
  lista: 'lista-1',
};

describe('Create Card Controller', () => {
  let token: string;

  beforeAll(async () => {
    const result = await supertest(app)
      .post('/login')
      .send({ login: 'letscode', senha: 'lets@123' });
    token = `Bearer ${result.body.accessToken}`;
  });

  it('POST /card unauthorized', async () => {
    const result = await supertest(app).post('/cards').send(successCard);
    expect(result.statusCode).toEqual(401);
  });

  it('POST /card success', async () => {
    const result = await supertest(app)
      .post('/cards')
      .set('Authorization', token)
      .send(successCard);
    expect(result.statusCode).toEqual(201);
  });

  it('POST /card invalid card', async () => {
    const result = await supertest(app)
      .post('/cards')
      .set('Authorization', token)
      .send(invalidCard);
    expect(result.statusCode).toEqual(400);
  });

  it('POST /card invalid body', async () => {
    const result = await supertest(app)
      .post('/cards')
      .set('Authorization', token)
      .send({});
    expect(result.statusCode).toEqual(400);
  });
});
