import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../../commons/exception/BadRequestException';
import { NotAuthorizedException } from '../../commons/exception/NotAuthorizedException';
import { NotFoundException } from '../../commons/exception/NotFoundException';

const ERROR_INTERNAL_SERVER_ERROR = 'error.internalServerError';
const ERROR_NOT_FOUND = 'error.notFound';
const ERROR_BAD_REQUEST = 'error.badRequest';
const ERROR_UNAUTHORIZED = 'error.unauthorized';

/**
 * Wrapper para captura das properties de erros do express.
 */
class HttpException extends Error {
  expose: boolean;
  status: number;
  message: string;
  body: string;
  type: string;
  constructor(
    status: number,
    expose: boolean,
    body: string,
    type: string,
    message: string,
  ) {
    super(message);
    this.expose = expose;
    this.status = status;
    this.message = message;
    this.body = body;
    this.type = type;
  }
}

/**
 * Tratamendo default de todos os erros lançados na api.
 * @param {HttpException} error - {@link HttpException}
 * @param {Request} request - express Request
 * @param {Response} response - express Response
 * @param {NextFunction} next - express NextFunction
 */
export const errorHandler = (
  error: HttpException,
  _request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  // TODO - Muito "if"
  if (error.status === 400 || error instanceof BadRequestException) {
    response.status(400).json({ msg: ERROR_BAD_REQUEST });
  } else if (error.status === 404 || error instanceof NotFoundException) {
    response.status(404).json({ msg: ERROR_NOT_FOUND });
  } else if (error.status === 401 || error instanceof NotAuthorizedException) {
    response.status(401).json({ msg: ERROR_UNAUTHORIZED });
  } else {
    response.status(500).json({ msg: ERROR_INTERNAL_SERVER_ERROR });
  }
};
