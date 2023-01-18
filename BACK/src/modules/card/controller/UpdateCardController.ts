import { Request, Response } from 'express';
import { BaseController } from '../../../commons/api/BaseController';
import Card from '../../../model/Card';
import { CardService } from '../CardService';

/**
 * Controller de edição de {@link Card}
 */
export class UpdateCardController extends BaseController {
  private cardService: CardService;

  constructor(cardService: CardService) {
    super();
    this.cardService = cardService;
  }

  async execute(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id);
    this.json(
      response,
      await this.cardService.updateCard(id, new Card(request.body)),
    );
  }
}
