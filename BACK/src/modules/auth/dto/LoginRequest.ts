import { JSONSchemaType } from 'ajv';

/**
 * Representação do body do login.
 */
export interface LoginBody {
  login: string;
  senha: string;
}

/**
 * Schema de validação para o login.
 */
export const LoginBodySchema: JSONSchemaType<LoginBody> = {
  type: 'object',
  properties: {
    login: { type: 'string' },
    senha: { type: 'string' },
  },
  required: ['login', 'senha'],
  additionalProperties: false,
};
