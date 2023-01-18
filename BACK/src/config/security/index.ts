import passport, { Strategy } from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from '../env';
import { AuthService } from '../../modules/auth/AuthService';

/**
 * AuthService {@link AuthService}
 */
const authService: AuthService = new AuthService();

/**
 * Retorna um novo token
 * @param {string} login - login do usuário
 * @returns {string} novo token
 */
export const token = (login: string): string => {
  return jwt.sign({ login }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Configuração passport LocalStrategy {@link https://www.passportjs.org/packages/passport-local}
 */
export const localPassport: Strategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'senha',
  },
  (login, senha, done) => {
    authService.authenticate(login, senha);
    return done(null, { login, senha });
  },
);

/**
 * Configuração passport JwtStrategy {@link http://www.passportjs.org/packages/passport-jwt}
 */
export const jwtPassport: Strategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY,
    ignoreExpiration: false,
  },
  (jwt_payload: any, done: VerifiedCallback) => {
    authService.verifyLogin(jwt_payload.login);
    return done(null, {});
  },
);

/**
 * Autentica um usuário.
 */
export const authenticate = passport.authenticate('local', { session: false });

/**
 * Verifica se usuário esta autenticado e esta válido.
 */
export const authenticated = passport.authenticate('jwt', { session: false });
