"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
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
    let token;
    beforeAll(async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ login: 'letscode', senha: 'lets@123' });
        token = `Bearer ${result.body.accessToken}`;
    });
    it('POST /card unauthorized', async () => {
        const result = await (0, supertest_1.default)(app_1.default).post('/cards').send(successCard);
        expect(result.statusCode).toEqual(401);
    });
    it('POST /card success', async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/cards')
            .set('Authorization', token)
            .send(successCard);
        expect(result.statusCode).toEqual(201);
    });
    it('POST /card invalid card', async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/cards')
            .set('Authorization', token)
            .send(invalidCard);
        expect(result.statusCode).toEqual(400);
    });
    it('POST /card invalid body', async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/cards')
            .set('Authorization', token)
            .send({});
        expect(result.statusCode).toEqual(400);
    });
});
