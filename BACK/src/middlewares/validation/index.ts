import Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';

/**
 * Configuração do Ajv {@link https://ajv.js.org}
 */
const ajv = new Ajv();

/**
 * Middleware para validar as requisições.
 * @param {any} schema - schema para validar o body.
 * @returns true se for válido.
 */
export const validate = (schema: any) => {
  const v = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!v(req.body)) return res.status(400).json(v.errors);
    return next();
  };
};
