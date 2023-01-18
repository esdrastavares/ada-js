import { NotAuthorizedException } from '../../commons/exception/NotAuthorizedException';
import { LOGIN, SENHA } from '../../config/env';
import { token } from '../../config/security';

/**
 * Serviço de autenticação e validação.
 *
 * O ideal seria implementar uma interface...
 */
export class AuthService {
  /**
   * Verica se o login é válido.
   * @param {string} login - login do usuário.
   */
  verifyLogin(login: string) {
    if (login !== LOGIN) {
      throw new NotAuthorizedException();
    }
  }

  /**
   * Verifica se o login e senha estão corretos.
   * @param {string} login - login do usuário
   * @param {string} password - senha do usuário
   */
  authenticate(login: string, password: string) {
    if (login !== LOGIN || password !== SENHA) {
      throw new NotAuthorizedException();
    }
  }

  /**
   * Gera um novo token baseado no login.
   * @param {string} login - login do usuário.
   * @returns novo token
   */
  generateToken(login: string): string {
    return token(login);
  }
}
