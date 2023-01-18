import { NextFunction, Request, Response } from 'express';

/**
 * Classe abstrata utilitária para os controllers.
 */
export abstract class BaseController {
  /**
   * Método abstrato de execução dos handlers das rotas.
   *
   * @param {Request} request - express Request
   * @param {Response} response - express Response
   */
  protected abstract execute(request: Request, response: Response): void;

  /**
   * Handler default para todas as rotas.
   *
   * @param {Request} request - express Request
   * @param {Response} response - express Response
   * @param {NextFunction} next - express NextFunction
   */
  public async handler(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this.execute(request, response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Utilitário para responses json.
   * @param {Request} res - express Request
   * @param {number} statusCode - http status code
   * @param {object | null} body - http response body
   */
  private jsonResponse(res: Response, statusCode: number, body: object | null) {
    res.status(statusCode).json(body);
  }

  /**
   * Utilitário para responses json.
   * @param {Request} res - express Request
   * @param {object | null} body - http response body
   */
  protected json(res: Response, body: object | null) {
    this.jsonResponse(res, 200, body);
  }

  /**
   * Utilitário para responses json com o status http 201(created).
   * @param {Request} res - express Request
   * @param {object | null} body - http response body
   */
  protected jsonCreated(res: Response, body: object) {
    this.jsonResponse(res, 201, body);
  }
}
