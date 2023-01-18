import dotenv from 'dotenv';
import path from 'path';

// dotenv utilizado apenas em ambiente não produtivo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.join(__dirname, '../../..', '.env') });
}

const ENV_JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || '');

export const LOGIN = process.env.LOGIN;
export const SENHA = process.env.SENHA;
export const PORT = process.env.PORT || 5001;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
export const JWT_EXPIRES_IN = Number.isInteger(ENV_JWT_EXPIRES_IN)
  ? ENV_JWT_EXPIRES_IN
  : 3600;
