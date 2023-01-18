import { Request, Response } from 'express';
import { BaseController } from '../../../commons/api/BaseController';
import { AuthService } from '../AuthService';

/**
 * Classe responsável pela autenticação do usuário.
 */
export class LoginController extends BaseController {
  /**
   * Serviço para autenticação do usuário.
   */
  private authService: AuthService;

  /**
   * Construtor.
   * @param {AuthService} authService - {@link AuthService}
   */
  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  /**
   * Handler de execução para o login.
   * @param {Request} request - express Request
   * @param {Response} response - express Response
   */
  async execute(request: Request, response: Response): Promise<void> {
    this.json(response, {
      accessToken: await this.authService.generateToken(request.body.login),
    });
  }
}
