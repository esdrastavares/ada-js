import { Request, Response } from 'express';
import { BaseController } from '../../../commons/api/BaseController';
import { CardService } from '../CardService';

/**
 * Controller de recuperação de todos os {@link Card}
 */
export class FindAllCardController extends BaseController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    super();
    this.cardService = cardService;
  }

  async execute(_request: Request, response: Response): Promise<void> {
    this.json(response, await this.cardService.findAll());
  }
}
