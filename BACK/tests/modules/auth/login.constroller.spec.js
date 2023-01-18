"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../src/app"));
describe('Login Controller', () => {
    it('POST /login success', async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ login: 'letscode', senha: 'lets@123' });
        expect(result.statusCode).toEqual(200);
    });
    it('POST /login unauthorized', async () => {
        const result = await (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send({ login: 'fakelogin', senha: 'fakepass' });
        expect(result.statusCode).toEqual(401);
    });
});
