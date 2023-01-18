import { Request, Response } from 'express';
import { BaseController } from '../../../commons/api/BaseController';
import { CardService } from '../CardService';

/**
 * Controller de remoção de {@link Card}
 */
export class DeleteCardController extends BaseController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    super();
    this.cardService = cardService;
  }

  async execute(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id);
    this.json(response, await this.cardService.deleteCard(id));
  }
}
