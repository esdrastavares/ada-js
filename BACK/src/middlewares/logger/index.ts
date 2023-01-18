import { NextFunction, Request, Response } from 'express';
import dayjs from 'dayjs';

/**
 * Typescript type...
 * O ideal seria um módulo com todos os recursos padronizados... sorry :(
 */
interface StringByString {
  [key: string]: string;
}

/**
 * Métodos para logar.
 */
const ACTION: StringByString = {
  PUT: 'Alterar',
  DELETE: 'Remover',
};

/**
 * Middleware para logas as alterações e remoções dos Cards {@link Card}
 * @param {Request} request - express Request
 * @param {Response} response - express Response
 * @param {NextFunction} next - express NextFunction
 */
export const logger = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  response.on('finish', () => {
    /**
     * Método http.
     */
    const requestMethod: string = request.method;

    /**
     * O ideal seria um módulo utilitário que só trata data.
     */
    const time = dayjs().format('DD/MM/YYYY HH:mm:ss');

    /**
     * Id do Card recuperado da url.
     */
    const cardId = request.params.id;

    /**
     * Título do Card recuperado do body.
     */
    const cardTitle = request.body.titulo;

    if (['PUT', 'DELETE'].includes(requestMethod)) {
      console.log(
        `${time} - Card ${cardId} - ${cardTitle || ''} - ${
          ACTION[requestMethod]
        }`,
      );
    }
  });

  next();
};
