import { JSONSchemaType } from 'ajv';

export interface CardId {
  id: number;
}

export interface CardContent {
  titulo: string;
  conteudo: string;
  lista: string;
}

export interface Card extends CardId, CardContent {}

/**
 * Validação de Card para adição.
 */
export const AddCardSchema: JSONSchemaType<CardContent> = {
  type: 'object',
  properties: {
    titulo: { type: 'string', minLength: 1 },
    conteudo: { type: 'string', minLength: 1 },
    lista: { type: 'string', minLength: 1 },
  },
  required: ['titulo', 'conteudo', 'lista'],
  additionalProperties: false,
};

/**
 * Validação de Card para edição.
 */
export const UpdateCardSchema: JSONSchemaType<Card> = {
  type: 'object',
  properties: {
    id: { type: 'number', minimum: 1 },
    titulo: { type: 'string', minLength: 1 },
    conteudo: { type: 'string', minLength: 1 },
    lista: { type: 'string', minLength: 1 },
  },
  required: ['id', 'titulo', 'conteudo', 'lista'],
  additionalProperties: false,
};
