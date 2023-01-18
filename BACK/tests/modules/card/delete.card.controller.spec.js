"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
const successCardAdd = {
    titulo: 'Titulo 1',
    conteudo: 'Conteudo 1',
    lista: 'lista-1',
};
describe('Delete Card Controller', () => {
    let token;
    const server = (0, supertest_1.default)(app_1.default);
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
